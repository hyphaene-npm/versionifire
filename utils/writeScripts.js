const fs = require('fs');
const inquirer = require('inquirer');
const { SCRIPTS, FORMAT, PACKAGE_FULL_PATH } = require('../constants');

const writeDefaultOptions = async pkg => {
	console.log('hey');
	let canSetScripts = true;
	if (pkg.scripts.patch || pkg.scripts.minor || pkg.scripts.major) {
		console.log({ pkg });
		const { override } = await inquirer.prompt([
			{
				name: 'override',
				message:
					'At least on ofThe patch / minor / major seems to be present, do you want to override your currents settings ?',
				type: 'confirm',
				default: true
			}
		]);
		canSetScripts = override;
	}
	if (canSetScripts) {
		pkg.scripts = {
			...pkg.scripts,
			...SCRIPTS
		};
		const json = JSON.stringify(pkg, null, 4);
		fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);
		console.log('Default scripts have been setup');
	} else {
		console.log('Scripts have been preserved');
	}
};

module.exports = writeDefaultOptions;
