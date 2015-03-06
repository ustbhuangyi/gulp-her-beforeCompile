/**
 * wrap each vinly file to her file
 * depends gulp-her-kernel
 */
'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

var pluginName = 'gulp-her-beforeCompile';

function createError(file, err) {
  if (typeof err === 'string') {
    return new PluginError(pluginName, file.path + ': ' + err, {
      fileName: file.path,
      showStack: false
    });
  }

  var msg = err.message || err.msg || 'unspecified error';

  return new PluginError(pluginName, file.path + ': ' + msg, {
    fileName: file.path,
    lineNumber: err.line,
    stack: err.stack,
    showStack: false
  });
}

module.exports = function (ret) {

  function beforeCompile(file, encoding, callback) {

    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }

    //wrap vinly file to her file
    var file = her.file(file);
    if (ret) {
      ret.ids[file.id] = file;
    }
    callback(null, file);

  }

  return through.obj(beforeCompile);
};
