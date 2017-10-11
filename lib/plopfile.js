const path = require("path");
//const modulePath = path.join(process.cwd(), 'db/models/{{camelCase name}}.model.js');
const modulePath = path.join(process.cwd(), 'app/models/{{properCase name}}.model.js');

module.exports = function (plop) {
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
        template: "{{properCase name}}"
        //template: "$1\nimport Model from \"./{{camelCase name}}.model\";"
      },

      // Add scheme properties
      {
        type: "modify",
        path: modulePath,
        pattern: /(\/\/ Model properties goes here)/g,
        template: '$1\n{{props}}'
      },
    ]
  });
};
