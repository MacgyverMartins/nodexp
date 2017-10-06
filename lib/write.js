/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

const fs = require('fs');
const MODE_0666 = parseInt('0666', 8)

module.exports = function write (path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   create'.cyan + ' : ' + path)
}

