const path = require("path");
const fs = require('fs');
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
const fse = require('fs-extra');
const s = require("underscore.string");

var mkdir = require("../mkdir.js");
var loadTemplate = require("../load-template.js");
var write = require("../write.js");
const pkg = require('../templates/package.js');

function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

function complete (name, path) {
  var prompt = launchedFromCmd() ? '>' : '$'

  console.log()
  console.log('   install dependencies:')
  console.log('     %s cd %s && npm install', prompt, path)
  console.log()
  console.log('   run the app:')

  if (launchedFromCmd()) {
    console.log('     %s SET DEBUG=%s:* & npm start', prompt, name)
  } else {
    console.log('     %s DEBUG=%s:* npm start', prompt, name)
  }

  console.log()
}

module.exports = function newCommand(program) {

  program
    .command('new <name>')
    .action(function(name){
      var destinationPath = name;

        const appTemplateDir = path.join(__dirname, '..', 'templates/base');
        fse.copy(appTemplateDir, destinationPath)
        .then(res => {

          // Create package.json
          var pkg = fs.readFileSync(path.join(__dirname, '..', 'templates/base/package.json'), 'utf-8')
          pkg = JSON.parse(pkg);
          pkg.name = name;
          write(destinationPath + '/package.json', JSON.stringify(pkg, null, 2) + '\n')

          complete(name, destinationPath)
        })
        .catch(err => program.handleError(err))
        

    })
    .parse(process.argv);

};
