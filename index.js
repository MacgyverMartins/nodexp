#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var program = require('commander');
var commands = require('./commands')(program);
var packageJson = require('./package.json');

program.LOG_PATH = process.env.HOME + '/.cli-log';

// Initialize cli options
program
  .version(packageJson.version)
  .usage('<command> [options]')
  .option('-d, --debug', 'show debug info');

// Initialize prompt
program.prompt = require('prompt');
program.prompt.message = '';
program.prompt.delimiter = '';
program.prompt.colors = false;

// Turn off colors when non-interactive
var colors = require('colors');
colors.mode = process.stdout.isTTY ? colors.mode : 'none';

// Setup logging and messaging
var logMessages = [];
program.log = (function (debugMode) {
  return function _log(logEntry, noPrint) {
    logMessages.push(logEntry);
    if (!noPrint && debugMode) {
      console.log('--debug-- '.cyan + logEntry);
    }
  };
})(process.argv.indexOf('--debug') >= 0);

program.successMessage = function successMessage() {
  var msg = util.format.apply(this, arguments);
  program.log('Success: ' + msg, true);
  console.log(msg.green);
};

program.errorMessage = function errorMessage() {
  var msg = util.format.apply(this, arguments);
  program.log('Error: ' + msg, true);
  console.log(msg.red);
};

program.handleError = function handleError(err, exitCode) {
  if (err) {
    if (err.message) {
      program.errorMessage(err.message);
    } else {
      program.errorMessage(err);
    }
  }

  console.log('For more information see: ' + program.LOG_PATH);

  fs.writeFileSync(program.LOG_PATH, logMessages.join('\n') + '\n');

  process.exit(exitCode || 1);
};

program.on('*', function() {
  console.log('Unknown Command: ' + program.args.join(' '));
  program.help();
});

// Process Commands
program.parse(process.argv);
