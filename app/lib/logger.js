var package = require('../../package.json');
var path = require('path');
var winston = require('winston');
var env = process.env.NODE_ENV;
var log_dir = 'log';

var log_filename = (env === 'production' ? 'log' : env + '.log')
var access_filename = 'access.' + log_filename;
var error_filename = 'error.' + log_filename;

module.exports = function(label){

  var error_transport = new winston.transports.File({
    name: 'error_log',
    filename: path.join(log_dir, error_filename),
    level: 'error',
    label: label
  });

  var access_transport = new winston.transports.File({
    name: 'access_log',
    filename: path.join(log_dir, access_filename),
    level: 'info',
    label: label
  });

  var console_transport = new winston.transports.Console({
    label: label,
    colorize: true
  });

  return new winston.Logger({
    transports: [
      console_transport,
      access_transport,
      error_transport
    ]
  });
};
