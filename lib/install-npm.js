module.exports = installNpm;

/**
 * `npm install` in a dir, using cp.exec
 */

var debug = require('debug')('npm-pkgr');

function installNpm(destFilePath, cb) {
  debug('start `npm install %s`', args);

  function done(err, stdout, stderr) {
    debug('end `npm install %s`', args);
    cb(err);
  }
}
