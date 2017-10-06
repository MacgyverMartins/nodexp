/**
 * Load template file.
 */

const path = require("path");
const ejs = require('ejs');
const fs = require('fs');

module.exports = function loadTemplate (name) {
  var contents = fs.readFileSync(path.join(__dirname, 'templates', (name + '.ejs')), 'utf-8')
  var locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals)
  }

  return {
    locals: locals,
    render: render
  }
}

