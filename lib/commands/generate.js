const path = require("path");
const program = require('commander');
const nodePlop = require('node-plop');
const _ = require('lodash');
var s = require("underscore.string");

const plop = nodePlop(path.join(__dirname, '../plopfile.js'));

const MODEL = 'model';
const CONTROLLER = 'controller';
const SNIPPETS = [MODEL, CONTROLLER];

function createModel(snippet, name, propsList) {
  // Create an object of properties
  let properties = '';
  if (propsList) {
    _.forEach(propsList, str => {
      str = str.split(':');
      if (str.length > 1) {
        let key = s(str[0]).camelize().value();
        let value = s(str[1]).capitalize().value();
        properties += `  ${key}: ${value},\n`;
      }
    })        
  }

  const modelGenerator = plop.getGenerator('model');
  modelGenerator.runActions({name: name, props: properties}).then(function (result) {
    if (result.failures.length > 0) {
      return program.handleError(result.failures[0]);
    }
    return program.successMessage(`${name} ${snippet} created!`);
  });
}

module.exports = function generateCommand(program) {

  program
    .command('generate <snippet> <name> [propsList...]')
    .alias('g')
    //.usage('<snippet> <name> [propsList...]')
    .action(function(snippet, name, propsList){

      // Validate if snippet exists
      if (!_.includes(SNIPPETS, snippet)) {
        return program.errorMessage(`Unknow snippet '${snippet}'. \n Please, run 'nodexp g --help'`);
      }

      switch (snippet) {
        case MODEL:
          createModel(...arguments);
          break;
      }

    })
    .parse(process.argv);

};
