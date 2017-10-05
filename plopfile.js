const path = require("path");
const modulePath = path.join(process.cwd(), 'db/models/{{camelCase name}}.model.js');

module.exports = function (plop) {
  // controller generator
  plop.setGenerator('model', {

    description: 'mongoose model logic',

    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your module name?',
    }],

    actions: [
      // Add a new model
      {
        type: 'add',
        path: modulePath,
        templateFile: 'plop-templates/model.js'
      },

      {
        type: "modify",
        path: modulePath,
        pattern: /(_modelName_)/g,
        template: "{{camelCase name}}"
        //template: "$1\nimport Model from \"./{{camelCase name}}.model\";"
      },
    ]

  });
};
