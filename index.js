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
	DEFAULT
} = require('./constants');

const { printVersion, printHelp, increase } = require('./utils');

const { getIsGitInitialized, initGit, add, commit, pushToCurrentBranch } = require('./utils/git');

fs.readFile(PACKAGE_PATH, FORMAT, async (err, data) => {
	const args = process.argv.slice(2);
	const [arg] = args;

	if (err) {
		console.log(err);
		process.exit(1);
	} else if (args.length > 1 || !arg) {
		console.log(WRONG_ARGS_NUMBER);
		process.exit(1);
	} else if (!ACCEPTED_ARGS.includes(arg)) {
		console.log(UNAVAILABLE_COMMAND);
		process.exit(1);
	} else {
		const package = JSON.parse(data); //now it an object
		const { version, versionifier } = package;
		let needExit = false;
		let [major, minor, patch] = version.split('.');

		const {
			commitIfOnlyPackageJsonInStage,
			commitIfMultipleFilesInStage,
			push,
			commitMessage
		} =
			versionifier || DEFAULT;

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
		console.log({ isGitInitialized });
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
			await pushToCurrentBranch();
		}

		if (needExit) {
			process.exit(0);
		}
		package.version = updatedVersion;
		const json = JSON.stringify(package, null, 4);
		console.log('Job is to be doooone :)');

		fs.writeFileSync('package.json', json, 'utf8');
		console.log('Job is doooone :)');
	}
});
