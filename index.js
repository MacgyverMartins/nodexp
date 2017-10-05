#!/usr/bin/env node

const path = require("path");
const program = require('commander');
const nodePlop = require('node-plop');
const plop = nodePlop(path.join(__dirname, 'plopfile.js'));

program
  //.command('generete <cmd>')
  //.alias('g')
  //.description('Create a new model')
  .arguments('<snippet>')
  .option('-n, --name <model name>', 'The model name')
  .action(function(snippet, options){
    const modelGenerator = plop.getGenerator(snippet);
    modelGenerator.runActions({name: 'macgyver'}).then(function (results) {
      console.log(__dirname);
      console.log(`Current directory: ${process.cwd()}`);
      console.log('res', results);
      // do something after the actions have run
    });
  })
  .parse(process.argv);

// load an instance of plop from a plopfile
//const plop = nodePlop('./plopfile.js');
// get a generator by name

// run all the generator actions using the data specified
//modelGenerator.runActions().then(function (results) {
  //console.log(__dirname);
  //console.log(`Current directory: ${process.cwd()}`);
  //console.log('res', results);
  //// do something after the actions have run
//});
