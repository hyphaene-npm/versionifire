const path = require('path');

const ACCEPTED_ARGS = ['patch', 'minor', 'help', 'major', 'version'];

const WRONG_ARGS_NUMBER = `This CLI accepts only one arg. please run :
    $ versionifier help
to see the available commands`;

const UNAVAILABLE_COMMAND = `command not available
    $ versionifier help
to see the available commands`;

const VERSION_COMMAND = `
$ versionifier version ( will ouput the cli version)
`;

const FORMAT = 'utf8';
const PATCH = 'patch';
const MINOR = 'minor';
const MAJOR = 'major';
const VERSION = 'version';
const HELP = 'help';

const AVAILABLE_COMMANDS = [PATCH, MINOR, MAJOR]
	.map(x => `$ versionifier ${x} ( will update by increasing ${x} version)`)
	.reduce((acc, current) => acc + `\n${current}\n`, VERSION_COMMAND);

const PACKAGE_PATH = './package.json';
const PACKAGE_FULL_PATH = path.join(process.cwd(), PACKAGE_PATH);

const DEFAULT = {
	commitIfOnlyPackageJsonInStage: false,
	commitIfMultipleFilesInStage: false,
	push: false,
	commitMessage: 'Updated package.json to version @@',
	remoteRepo: 'origin',
	publish: false
};

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
	HELP,
	AVAILABLE_COMMANDS,
	DEFAULT,
	PACKAGE_FULL_PATH
};
