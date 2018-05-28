const execa = require('execa');
const ora = require('ora');
const { PACKAGE_FULL_PATH } = require('../constants');
const { getCommitMessage, getSpinner } = require('./index');

const initGit = async () => execa.shell('git init');

const commit = async (commitMessage, version) => {
	execa.shell(`git commit -m "${getCommitMessage(commitMessage, version)}"`);
};
const add = async () => {
	execa.shell(`git add ${PACKAGE_FULL_PATH}`);
};

const pushToCurrentBranch = async (remoteRepo = 'origin') =>
	execa.shell(`git push ${remoteRepo} "$(git rev-parse --abbrev-ref HEAD)"`);

const oraInit = async () => {
	const promise = initGit();
	ora.promise(promise, getSpinner(`initializing git repository`));
	await promise;
};

const oraAdd = async () => {
	const promise = add();
	ora.promise(promise, getSpinner(`add on staging`));
	await promise;
};

const oraCommit = async (commitMessage, version) => {
	const promise = commit(commitMessage, version);
	ora.promise(promise, getSpinner(`making the commit`));
	await promise;
};

const oraPush = async remoteRepo => {
	const promise = pushToCurrentBranch(remoteRepo);
	ora.promise(promise, getSpinner(`pushing on ${remoteRepo}`));
	await promise;
};

module.exports = {
	initGit: oraInit,
	add: oraAdd,
	commit: oraCommit,
	pushToCurrentBranch: oraPush
};
