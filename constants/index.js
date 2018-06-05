const path = require('path');

const getHelp = prefix => `${prefix}
$ versionifier help
to see the available commands`;

const WRONG_ARGS_NUMBER = getHelp('This CLI accepts only one arg. please run :');
const UNAVAILABLE_COMMAND = getHelp('command not available :');

const VERSION_COMMAND = `
$ versionifier version ( will ouput the cli version)
`;

const FORMAT = 'utf8';
const PATCH = 'patch';
const MINOR = 'minor';
const MAJOR = 'major';
const VERSION = 'version';
const HELP = 'help';
const ADD_SCRIPTS = 'scripts';
const DEFAULT_OPTIONS = 'default';
const ACCEPTED_ARGS = [PATCH, MINOR, HELP, MAJOR, VERSION, DEFAULT_OPTIONS, ADD_SCRIPTS];

const AVAILABLE_COMMANDS = [PATCH, MINOR, MAJOR]
	.map(x => `$ versionifier ${x} ( will update by increasing ${x} version)`)
	.reduce((acc, current) => `${acc}\n${current}\n`, VERSION_COMMAND);

const SCRIPTS = {
	[PATCH]: `versionifier ${PATCH}`,
	[MINOR]: `versionifier ${MINOR}`,
	[MAJOR]: `versionifier ${MAJOR}`
};

const PACKAGE_PATH = './package.json';
const GIT_PATH = './.git';
const PACKAGE_FULL_PATH = path.join(process.cwd(), PACKAGE_PATH);
const GIT_FULL_PATH = path.join(process.cwd(), GIT_PATH);

const DEFAULT = {
	commitIfOnlyPackageJsonInStage: false,
	commitIfMultipleFilesInStage: false,
	push: false,
	commitMessage: 'Updated package.json to version @@',
	remoteRepo: 'origin',
	publish: false
};

const publishCmd = 'npm publish';
const initCmd = 'npm init';

module.exports = {
	ACCEPTED_ARGS,
	WRONG_ARGS_NUMBER,
	UNAVAILABLE_COMMAND,
	FORMAT,
	PACKAGE_PATH,
	PATCH,
	MINOR,
	MAJOR,
	VERSION,
	ADD_SCRIPTS,
	HELP,
	SCRIPTS,
	DEFAULT_OPTIONS,
	AVAILABLE_COMMANDS,
	DEFAULT,
	PACKAGE_FULL_PATH,
	GIT_FULL_PATH,
	initCmd,
	publishCmd
};
