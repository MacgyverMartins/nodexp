const path = require("path");
const program = require('commander');
const nodePlop = require('node-plop');
const plop = nodePlop(path.join(__dirname, '../plopfile.js'));

module.exports = function helloCommand(program) {

  program
    .command('generate <snippet> <name> [propsList...]')
    .alias('g')
    .usage('<snippet> <name> [propsList...]')
    .action(function(snippet, name, propsList){
      if (snippet !== 'model') {
        return program.errorMessage(`Unknow snippet '${snippet}'. \n Please, run 'nodexp g --help'`);
      }

      const modelGenerator = plop.getGenerator(snippet);
      modelGenerator.runActions({name: name}).then(function (a, b) {
        return program.successMessage(`${name} ${snippet} created!`);
      });
    })
    .parse(process.argv);

};
