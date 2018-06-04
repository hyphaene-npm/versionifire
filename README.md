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

Here are some scripts you can add inside the package.json :

```
"up:patch": "versionifier patch",
"up:minor": "versionifier minor",
"up:major": "versionifier major",
```

(then run)

```bash
yarn up:patch
```

or

```bash
npm run up:patch
```

for example

options : ( defaultValues)

*   commitIfOnlyPackageJsonInStage: false
*   commitIfMultipleFilesInStage: false
*   commitMessage: 'update version package to $VERSION'
*   push : false
*   remoteRepo: 'origin'
*   publish : false

### Roadmap

v1 :

*   [ ] handle no package.json
*   [ ] handle override settings one by one
*   [ ] add a command to write the default keys inside the package.json
*   [ ] and add command to choose value for each if default value not chosen

v2:

*   [ ] use as a prepublishOnly script ? ( with inquirer ? like used package.json settings? if no, all questions are asked (depending on previous answer if actions are connected ))

Out of scopes :

*   [ ] check if code works on node 4,5,6 etc
*   [ ] handle compatibility

## Ressources

*   https://blog.risingstack.com/mastering-the-node-js-cli-command-line-options/
*   https://stackoverflow.com/questions/12941083/get-the-output-of-a-shell-command-in-node-js

### command-line-args

*   https://www.npmjs.com/package/command-line-args
*   https://github.com/Polymer/polymer-cli/
