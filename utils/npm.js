const execa = require('execa');
const ora = require('ora');
const { getSpinner } = require('./index');
const { publishCmd, initCmd } = require('../constants');

const publish = async () => {
	execa.shell(publishCmd);
};

const oraPublish = async () => {
	const promise = publish();
	ora.promise(promise, getSpinner(`running ${publishCmd}`));
	await promise;
};

const init = async () => {
	execa.shell(initCmd);
};
const oraInit = async () => {
	const promise = init();
	ora.promise(promise, getSpinner(`running ${initCmd}`));
	await promise;
};

module.exports = {
	runPublish: oraPublish,
	runInit: oraInit
};
