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
yarn add versionifier
```

or

```bash
npm install --save versionifier
```

## Usage

Here are the commands :

```bash
$ versionifier version # output the version
$ versionifier help # output the available commands
$ versionifier default # add the default options in the package.json
$ versionifier patch # increase by 1 the patch version of your current package.json
$ versionifier minor # increase by 1 the minor version of your current package.json
$ versionifier major # add scripts package.json
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

-   commitIfOnlyPackageJsonInStage: false
-   commitIfMultipleFilesInStage: false
-   commitMessage: 'update version package to $VERSION'
-   push : false
-   remoteRepo: 'origin'
-   publish : false

### Roadmap

v1 :

-   [ ] handle override settings one by one
-   [x] add a command to write the default keys inside the package.json
    -   [ ] and add command to choose value for each if default value not chosen
