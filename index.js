#!/usr/bin/env node
const fs = require('fs');

const acceptedArgs = ['patch', 'minor', 'help', 'major', 'version'];
console.log('========');

console.log(process.argv);
console.log('========');

fs.readFile('./package.json', 'utf8', function readFileCallback(err, data) {
  if (err) {
    console.log(err);
    throw 'oops';
  } else {
    const package = JSON.parse(data); //now it an object
    const { version } = package;
    const [major, minor, patch] = version.split('.');
    console.log({ major, minor, patch });
    const json = JSON.stringify(package); //convert it back to json
    fs.writeFile('package.json', json, 'utf8'); // write it back
  }
});
