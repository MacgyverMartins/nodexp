const path = require("path");
const fs = require('fs');
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
var s = require("underscore.string");

var mkdir = require("../mkdir.js");
var loadTemplate = require("../load-template.js");
var write = require("../write.js");

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
        var app = loadTemplate('js/app.js');

        app.locals.modules = Object.create(null);
        app.locals.view = Object.create(null);
        app.locals.uses = [];

        app.locals.modules.lessMiddleware = 'less-middleware'
        write(destinationPath + '/app.js', app.render())
        complete(name, destinationPath)
      });
    })
    .parse(process.argv);

};
