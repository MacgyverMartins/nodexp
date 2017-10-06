/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

const mkdirp = require('mkdirp');

const MODE_0755 = parseInt('0755', 8)

module.exports = function mkdir (path, fn) {
  mkdirp(path, MODE_0755, function (err) {
    if (err) throw err
    console.log('   create'.cyan+ ' : ' + path)
    fn && fn()
  })
}

