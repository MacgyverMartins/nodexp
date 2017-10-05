const path = require("path");
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
var s = require("underscore.string");

const plop = nodePlop(path.join(__dirname, '../plopfile.js'));

const MODEL = 'model';
const CONTROLLER = 'controller';
const SNIPPETS = [MODEL, CONTROLLER];

module.exports = function helloCommand(program) {

  program
    .command('generate <snippet> <name> [propsList...]')
    .alias('g')
    .usage('<snippet> <name> [propsList...]')
    .action(function(snippet, name, propsList){

      // Validate if snippet exists
      if (!_.includes(SNIPPETS, snippet)) {
        return program.errorMessage(`Unknow snippet '${snippet}'. \n Please, run 'nodexp g --help'`);
      }

      // Create an object of properties
      const properties = {};
      if (propsList) {
        _.forEach(propsList, str => {
          str = str.split(':');
          if (str.length > 1) {
            let key = s(str[0]).camelize().value();
            let value = s(str[1]).capitalize().value();
            properties[key] = value;
          }
        })        
      }

      const modelGenerator = plop.getGenerator(snippet);
      modelGenerator.runActions({name: name}).then(function (result) {
        if (result.failures.length > 0) {
          return program.handleError(result.failures[0]);
        }
        return program.successMessage(`${name} ${snippet} created!`);
      });

    })
    .parse(process.argv);

};
