var server = require('./hapi.js');

process.on('uncaughtException', function(err) {
  // logger.fatal("Uncaught Exception [" + (err.toString()) + "]\n" + err.stack);
  console.log("Uncaught Exception [" + (err.toString()) + "]\n" + err.stack);
  process.emit('cleanup');
  return setTimeout(function() {
    return process.exit(1);
  }, 500);
});

process.on('SIGTERM', function() {
  // logger.info('caught SIGTERM');
  console.console.log('caught SIGTERM');
  process.emit('cleanup');
  return setTimeout(function() {
    return process.exit(0);
  }, 500);
});

process.on('SIGINT', function() {
  // logger.info('caught SIGINT');
  console.log('caught SIGINT');
  process.emit('cleanup');
  return setTimeout(function() {
    return process.exit(0);
  }, 500);
});

process.on('cleanup', function() {
  server.stop(); // stop the server so it cleans up after itself
  // return logger.info('cleanup signal detected, exiting in .5 seconds...');
  return console.log('cleanup signal detected, exiting in .5 seconds...');
});
