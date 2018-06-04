const fs = require('fs');
const { DEFAULT, FORMAT, PACKAGE_FULL_PATH } = require('../constants');

const writeDefaultOptions = pkg => {
	pkg.versionifier = DEFAULT;
	const json = JSON.stringify(pkg, null, 4);
	fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);
};

module.exports = writeDefaultOptions;
