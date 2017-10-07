const path = require("path");
const fs = require('fs');
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
var s = require("underscore.string");

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
      //var destinationPath = program.args.shift() || '.';
      var destinationPath = name;

      mkdir(destinationPath, function () {
        // Create public folder
        mkdir(destinationPath + '/public', function () {
          mkdir(destinationPath + '/public/javascripts')
          mkdir(destinationPath + '/public/images')
          mkdir(destinationPath + '/public/stylesheets')
        });

        mkdir(destinationPath + '/config', () => {
          let routes = loadTemplate('js/routes.js');
          write(destinationPath + '/config/routes.js', routes.render());
        })

        // Create app.js
        let app = loadTemplate('js/app.js');
        write(destinationPath + '/app.js', app.render())

        // Create package.json
        pkg.name = name;
        write(destinationPath + '/package.json', JSON.stringify(pkg, null, 2) + '\n')

        complete(name, destinationPath)
      })

    })
    .parse(process.argv);

};
