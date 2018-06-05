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
	DEFAULT_OPTIONS,
	DEFAULT,
	PACKAGE_FULL_PATH,
	GIT_FULL_PATH,
	ADD_SCRIPTS
} = require('./constants');

const { printVersion, printHelp, increase } = require('./utils');
const { initGit, add, commit, pushToCurrentBranch } = require('./utils/git');
const { runPublish } = require('./utils/npm');
const writeDefaultOptions = require('./utils/writeDefaultOptions');
const writeScripts = require('./utils/writeScripts');

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
		const pkg = JSON.parse(data); // now it an object
		const { version, versionifier } = pkg;
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
		case DEFAULT_OPTIONS:
			needExit = true;
			await writeDefaultOptions(pkg);
			break;
		case ADD_SCRIPTS:
			await writeScripts(pkg);
			needExit = true;
			break;
		default:
			break;
		}
		if (needExit) {
			return;
		}
		const updatedVersion = [major, minor, patch].join('.');
		pkg.version = updatedVersion;
		const json = JSON.stringify(pkg, null, 4);
		fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);

		if (!fs.existsSync(GIT_FULL_PATH)) {
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

		if (publish) {
			await runPublish();
		}
		setTimeout(() => {
			console.log(`Job is doooone :), package is at version : ${updatedVersion}`);
		}, 124);
	}
});
