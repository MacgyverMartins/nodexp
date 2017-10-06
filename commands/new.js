const path = require("path");
const ejs = require('ejs');
const fs = require('fs');
const mkdirp = require('mkdirp');
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
var s = require("underscore.string");

const MODE_0666 = parseInt('0666', 8)
const MODE_0755 = parseInt('0755', 8)

function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

/**
 * Load template file.
 */

function loadTemplate (name) {
  var contents = fs.readFileSync(path.join(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8')
  var locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals)
  }

  return {
    locals: locals,
    render: render
  }
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write (path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   create'.cyan + ' : ' + path)
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

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir (path, fn) {
  mkdirp(path, MODE_0755, function (err) {
    if (err) throw err
    console.log('   create'.cyan+ ' : ' + path)
    fn && fn()
  })
}

module.exports = function newCommand(program) {

  program
    .command('new')
    .usage('E isso ai ')
    .action(function(snippet, name, propsList){

      var destinationPath = program.args.shift() || '.';
      console.log(destinationPath);

      mkdir(destinationPath, function () {
        var app = loadTemplate('js/app.js');

        app.locals.modules = Object.create(null);
        app.locals.view = Object.create(null);
        app.locals.uses = [];

        app.locals.modules.lessMiddleware = 'less-middleware'
        write(destinationPath + '/app.js', app.render())
        complete('hello-app', destinationPath)
      });

    })
    .parse(process.argv);

};
