#!/usr/bin/env node
const fs = require('fs');

const acceptedArgs = ['patch', 'minor', 'help', 'major', 'version'];

fs.readFile('./package.json', 'utf8', (err, data) => {
	const args = process.argv.slice(2);
	const [arg] = args;
	if (err) {
		console.log(err);
		throw new Error('oops');
	} else if (args.length > 1) {
		throw new Error(`This CLI accepts only one arg. please run :
    $ versionifier help
to see the available commands`);
	} else if (!acceptedArgs.includes(arg)) {
		throw new Error(`command not available
    $ versionifier help
to see the available commands`);
	} else {
		const package = JSON.parse(data); //now it an object
		const { version } = package;
		// test //
		package.yolo = 'yolooooo';
		const [major, minor, patch] = version.split('.');
		console.log({ major, minor, patch });

		const json = JSON.stringify(package); //convert it back to json
		fs.writeFile('package.json', json, 'utf8', () => {
			console.log('Job is done :)');
		}); // write it back
	}
});
