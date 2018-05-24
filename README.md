/!\ dev mode /!\ => available at 1.0.0

Hi there !
Tired to manually update your package.json to increase your version number ?
This CLI solves this issue.

## Install

First, install it globally :

```bash
yarn global add versionifier
```

```bash
npm install -g versionifier
```

(those might need `sudo` to work)

## Usage

Here are the commands :

* versionifier version : output the version
* versionifier help : output the available commands
* versionifier patch : increase by 1 the patch version of your current package.json
* versionifier minor : increase by 1 the minor version of your current package.json
* versionifier major : increase by 1 the major version of your current package.json

### Roadmap

* [ ] add the possibilty to parse another arg to indicate the path of the package.json which would be processed
