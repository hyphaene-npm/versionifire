const { AVAILABLE_COMMANDS } = require('../constants');

const printHelp = () => {
	console.log(AVAILABLE_COMMANDS);
};
const printVersion = version => {
	console.log(`The version is : ${version}`);
};

const increase = partialVersion => parseInt(partialVersion) + 1;

module.exports = {
	printHelp,
	printVersion,
	increase
};
