#!/usr/bin/env node
const fs = require('fs');
const execa = require('execa');

const {
	ACCEPTED_ARGS,
	WRONG_ARGS_NUMBER,
	UNAVAILABLE_COMMAND,
	FORMAT,
	PACKAGE_PATH,
	PATCH,
	MAJOR,
	MINOR,
	VERSION,
	HELP,
	DEFAULT,
	PACKAGE_FULL_PATH
} = require('./constants');

const { printVersion, printHelp, increase } = require('./utils');

const {
	getIsGitInitialized,
	initGit,
	add,
	commit,
	pushToCurrentBranch,
	runPublish
} = require('./utils/git');

fs.readFile(PACKAGE_PATH, FORMAT, async (err, data) => {
	const args = process.argv.slice(2);
	const [arg] = args;

	if (err) {
		console.log(err);
		return;
	} else if (args.length > 1 || !arg) {
		console.log(WRONG_ARGS_NUMBER);
		return;
	} else if (!ACCEPTED_ARGS.includes(arg)) {
		console.log(UNAVAILABLE_COMMAND);
		return;
	} else {
		const package = JSON.parse(data); //now it an object
		const { version, versionifier } = package;
		let needExit = false;
		let [major, minor, patch] = version.split('.');

		const { commitIfOnlyPackageJsonInStage } = versionifier || DEFAULT;
		const { commitIfMultipleFilesInStage } = versionifier || DEFAULT;
		const { push } = versionifier || DEFAULT;
		const { commitMessage } = versionifier || DEFAULT;
		const { remoteRepo } = versionifier || DEFAULT;
		const { publish } = versionifier || DEFAULT;

		switch (arg) {
		case PATCH:
			patch = increase(patch);
			break;
		case MINOR:
			minor = increase(minor);
			patch = 0;
			break;
		case MAJOR:
			major = increase(major);
			minor = 0;
			patch = 0;
			break;
		case VERSION:
			printVersion(version);
			needExit = true;
			break;
		case HELP:
			needExit = true;
			printHelp();
			break;
		}
		const updatedVersion = [major, minor, patch].join('.');

		const isGitInitialized = await getIsGitInitialized();
		if (!isGitInitialized) {
			await initGit();
		}
		const { stdout } = await execa.shell('git diff --name-only --cached');
		if (
			(stdout && commitIfMultipleFilesInStage) ||
			(!stdout && (commitIfOnlyPackageJsonInStage || commitIfMultipleFilesInStage))
		) {
			await add();
			await commit(commitMessage, updatedVersion);
		}
		if (push) {
			await pushToCurrentBranch(remoteRepo);
		}

		if (needExit) {
			return;
		}
		package.version = updatedVersion;
		const json = JSON.stringify(package, null, 4);
		fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);
		console.log(`Job is doooone :), package is at version : ${updatedVersion}`);

		if (publish) {
			await runPublish();
		}
		return;
	}
});
