const execa = require('execa');
const ora = require('ora');
const getCommitMessage = require('./index');
//
const getSpinner = text => ({ text, color: 'red' });
//
const getIsGitInitialized = async () =>
	await execa.shell('git rev-parse --is-inside-work-tree 2>/dev/null').stdout;
//
const initGit = async () => execa.shell('git init');

const commit = async (commitMessage, version) => {
	execa.shell(`git commit -m "${getCommitMessage(commitMessage, version)}"`);
};
const add = async () => {
	execa.shell('git add package.json');
};

const pushToCurrentBranch = async () =>
	execa.shell('git push origin `git rev-parse --abbrev-ref HEAD`');

const oraCommit = async (commitMessage, version) => {
	const promise = commit(commitMessage, version);
	ora.promise(promise, getSpinner(`making the commit`));
	await promise;
};

const oraInit = async () => {
	const promise = initGit();
	ora.promise(promise, getSpinner(`add on staging`));
	await promise;
};
const oraAdd = async () => {
	const promise = add();
	ora.promise(promise, getSpinner(`add on staging`));
	await promise;
};
const oraPush = async () => {
	const promise = pushToCurrentBranch();
	ora.promise(promise, getSpinner(`add on staging`));
	await promise;
};

module.exports = {
	getIsGitInitialized,
	initGit: oraInit,
	add: oraAdd,
	commit: oraCommit,
	pushToCurrentBranch: oraPush
};
