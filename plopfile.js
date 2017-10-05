const path = require("path");
const modulePath = path.join(process.cwd(), 'db/models/{{camelCase name}}.model.js');
const modulePath2 = path.join(process.cwd(), '{{properCase name}}.model.js');

const str = "\nimport Model from \"./{{camelCase name}}.model\";";

module.exports = function (plop) {
  plop.setActionType('doTheThing', function (answers, config, plop) {
    // do something
    console.log('answers', answers);
    console.log('config', config);
    // if something went wrong
    throw 'error message';
    // otherwise
    return 'success status message';
  });

  // controller generator
  plop.setGenerator('model', {
    description: 'mongoose model logic',

    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your module name?',
    }, {
    }],

    actions: [
      // Add a new model
      {
        type: 'add',
        path: modulePath,
        templateFile: 'plop-templates/model.js'
      },

      // Add model name
      {
        type: "modify",
        path: modulePath,
        pattern: /(_modelName_)/g,
        template: "{{camelCase name}}"
        //template: "$1\nimport Model from \"./{{camelCase name}}.model\";"
      },

      // Add scheme properties
      {
        type: "modify",
        path: modulePath,
        pattern: /(\/\/ Model properties goes here)/g,
        template: `$1${str}`
      },
    ]
  });

  plop.setGenerator('addProps', {
    prompts: [],
    //actions: [{
      //type: 'doTheThing',
      //configProp: '{{name}} available from the config param',
      //macgyver: 'may nomezinho',
    //}]

    actions: [{
        type: 'add',
        path: modulePath2,
        templateFile: 'plop-templates/model.js'
      },{
        type: 'modify',
        path: modulePath2,
        pattern: /(\/\/ Model properties goes here)/g,
        template: '$1\n{{props}}'
      }]
  });
};
