'use strict';
var fs = require('fs');
var async = require('async');
var path = require('path');
var debug = require('debug')('npm-pkgr');

function cp(src, dest, callback) {
  var reader = fs.createReadStream(src);
  var writer = fs.createWriteStream(dest);

  reader.on('error', callback);
  writer.on('error', callback);

  reader.pipe(writer);

  writer.on('finish', callback);
}

function lazyCopy(files, to, cb) {
  async.waterfall([
    function filter(cb) {
      async.filter(files, fs.exists, function(files) {
        cb(null, files);
      });
    },
    function copyFiltered(files) {
      debug('copy filtered', files);

      async.each(files, function copy(file, cb) {
        debug('file', file);
        debug(path.join(to, path.basename(file)));
        cp(file, path.join(to, path.basename(file)), cb);
      }, cb);
    }
  ], cb);
}

module.exports = lazyCopy;
