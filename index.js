#!/usr/bin/env node
const fs = require('fs');

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

		const { commitIfOnlyPackageJsonInStage, commitIfMultplileFilesInStage, push } =
			versionifier || DEFAULT;
		const taa = await test();
		console.log('taa', taa);
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
		if (needExit) {
			process.exit(0);
		}

		const updatedVersion = [major, minor, patch].join('.');
		package.version = updatedVersion;
		const json = JSON.stringify(package, null, 4);
		fs.writeFile('package.json', json, 'utf8', () => {
			console.log('Job is doooone :)');
		});
	}
});
