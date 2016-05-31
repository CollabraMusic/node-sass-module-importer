var path = require('path');

var CSS_IMPORT_REGEX = /^((\/\/)|(http:\/\/)|(https:\/\/))/;
var IMPORTER_PREFIX_REGEX = /^~/;

module.exports = function importer (url, prev, done){
  var result = {};

  if (url.match(IMPORTER_PREFIX_REGEX)) {
    var modulePath = path.join(__dirname, '../../', 'node_modules', url.replace(IMPORTER_PREFIX_REGEX, ''));
    result.file = modulePath;
  } else {
    // if we don't escape this, then it's breaking the normal css @import
    if (url.match(CSS_IMPORT_REGEX)) {
      result.file = '\'' + url + '\'';
    }

    result.file = url;
  }

  return done ? done(results) : result;
};
