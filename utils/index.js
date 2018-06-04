const { AVAILABLE_COMMANDS } = require('../constants');

const printHelp = () => {
	console.log(AVAILABLE_COMMANDS);
};
const printVersion = version => {
	console.log(`The version is : ${version}`);
};

const getSpinner = text => ({ text, color: 'blue' });

const increase = partialVersion => parseInt(partialVersion) + 1;
const getCommitMessage = (message, version) => message.replace('@@', version);

module.exports = {
	printHelp,
	printVersion,
	increase,
	getCommitMessage,
	getSpinner
};
