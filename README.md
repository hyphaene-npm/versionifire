## Goal

Hi there !
Tired to manually update your package.json to increase your version number ?
This CLI solves this issue.

## Install

### globally

First, install it globally :

```bash
yarn global add versionifier
```

or

```bash
npm install -g versionifier
```

(those might need `sudo` to work)

### locally

```bash
yarn add -D versionifier
```

or

```bash
npm install --save-dev versionifier
```

## Usage

Here are the commands :

```bash
$ versionifier version # output the version
$ versionifier help # output the available commands
$ versionifier patch # increase by 1 the patch version of your current package.json
$ versionifier minor # increase by 1 the minor version of your current package.json
$ versionifier major # increase by 1 the major version of your current package.json
```

if the CLi is installed locally, here are some scripts to add inside the package.json :

```
"up:patch": "versionifier patch",
"up:minor": "versionifier minor",
"up:major": "versionifier major",
```

[//]: # 'dans les settings js :"/.versionifierrc": "json"'

### Roadmap

options :

commitWhenOnlyFileInStage: false
commitWhenOnlyFileInStage: false
customMessageForCommit: 'update version package to $VERSION'
push : false

v1:

*   [ ] just handles the <"cwd">/package.json
*   [ ] handle git commands through .versionifierrc

v2:

*   [ ] use a prepublishOnly script

Out of scopes :

*   [ ] check if code works on node 4,5,6 etc
*   [ ] handle compatibility

## Ressources

*   https://blog.risingstack.com/mastering-the-node-js-cli-command-line-options/
*   https://stackoverflow.com/questions/12941083/get-the-output-of-a-shell-command-in-node-js

### command-line-args

*   https://www.npmjs.com/package/command-line-args
*   https://github.com/Polymer/polymer-cli/
