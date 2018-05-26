const execa = require('execa');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { getCommitMessage } = require('./index');
//
const getSpinner = text => ({ text, color: 'red' });
//
const getIsGitInitialized = () => {
	const gitPath = path.join(process.cwd(), '.git');
	try {
		fs.readdirSync(gitPath);
		return true;
	} catch (e) {
		return false;
	}
};
//
const initGit = async () => execa.shell('git init');

const commit = async (commitMessage, version) => {
	execa.shell(`git commit -m "${getCommitMessage(commitMessage, version)}"`);
};
const add = async () => {
	execa.shell('git add ./package.json');
};

const pushToCurrentBranch = async (repo = 'origin') =>
	execa.shell(`git push ${repo} "$(git rev-parse --abbrev-ref HEAD)"`);

const oraInit = async () => {
	const promise = initGit();
	ora.promise(promise, getSpinner(`init`));
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

const oraPush = async () => {
	const promise = pushToCurrentBranch();
	ora.promise(promise, getSpinner(`push`));
	await promise;
};

module.exports = {
	getIsGitInitialized,
	initGit: oraInit,
	add: oraAdd,
	commit: oraCommit,
	pushToCurrentBranch: oraPush
};
