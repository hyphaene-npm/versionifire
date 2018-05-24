/!\ dev mode /!\ => available at 1.0.0

Hi there !
Tired to manually update your package.json to increase your version number ?
This CLI solves this issue.

## Install

First, install it globally :

```bash
yarn global add versionifier
```

or

```bash
npm install -g versionifier
```

(those might need `sudo` to work)

## Usage

Here are the commands :

*   versionifier version : output the version
*   versionifier help : output the available commands
*   versionifier patch : increase by 1 the patch version of your current package.json
*   versionifier minor : increase by 1 the minor version of your current package.json
*   versionifier major : increase by 1 the major version of your current package.json

### Roadmap

v1:

*   [ ] just handles the <"cwd">/package.json and no git command

v2:

*   [ ] handle git commands through .versionifierrc or package.json
*   [ ] parse .versionifierrc at : current location / user root by default
*   [ ] parse package.json "versionifier" key
*   [ ] .versionifierrc options : commit= false

v3: use of `commander` or `command-lin-args`

*   [ ] parse another arg to indicate the path of the package.json which would be processed : -p='../path/to/file ( both relative and absolute paths)
*   [ ] parse another arg to indicate the path of the package.json which would be processed : -c='../path/to/config
*   [ ] set config via cli ( versionifier set-config -g? || (-c + path/to/configFile)? + key=value)
*   [ ] get config via cli ( versionifier set-config -g? || (-c + path/to/configFile)? )

## Ressources

*   https://blog.risingstack.com/mastering-the-node-js-cli-command-line-options/

### command-line-args

*   https://www.npmjs.com/package/command-line-args
*   https://github.com/Polymer/polymer-cli/
