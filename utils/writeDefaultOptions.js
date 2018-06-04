const fs = require('fs');
const inquirer = require('inquirer');
const { DEFAULT, FORMAT, PACKAGE_FULL_PATH } = require('../constants');

const writeDefaultOptions = async pkg => {
	let canSetKeys = true;
	if (pkg.versionifier) {
		const { override } = await inquirer.prompt([
			{
				name: 'override',
				message:
					'The versionifier key seems to be present, do you want to override your currents settings ?',
				type: 'confirm',
				default: true
			}
		]);
		console.log({ override });
		canSetKeys = override;
	}
	if (canSetKeys) {
		pkg.versionifier = DEFAULT;
		const json = JSON.stringify(pkg, null, 4);
		fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);
		console.log('Default keys have been setup');
	} else {
		console.log('Keys have been preserved');
	}
};

module.exports = writeDefaultOptions;
