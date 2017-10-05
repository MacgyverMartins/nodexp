#!/usr/bin/env node

const path = require("path");

const nodePlop = require('node-plop');
// load an instance of plop from a plopfile
const plop = nodePlop(path.join(__dirname, 'plopfile.js'));
//const plop = nodePlop('./plopfile.js');
// get a generator by name
const modelGenerator = plop.getGenerator('model');

// run all the generator actions using the data specified
modelGenerator.runActions().then(function (results) {
  console.log(__dirname);
  console.log('res', results);
  // do something after the actions have run
});
