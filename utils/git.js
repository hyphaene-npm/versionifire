const execa = require('execa');
const getCommitMessage = require('./index');

const getIsGitInitialized = async () =>
	(await execa.shell('git rev-parse --is-inside-work-tree 2>/dev/null')).stdout;

const initGit = async () => await execa.shell('git init');

const addAndCommit = async (commitMessage, version) => {
	await execa.shell('git add package.json');
	await execa.shell(`git commit -m "${getCommitMessage(commitMessage, version)}"`);
};

const pushToCurrentBranch = async () =>
	await execa.shell('git push origin `git rev-parse --abbrev-ref HEAD`');

module.exports = {
	getIsGitInitialized,
	initGit,
	addAndCommit,
	pushToCurrentBranch
};
