var logger = require('./logger.js')('process');

module.exports = function(server){

  process.on('uncaughtException', function(err) {
    logger.error("Uncaught Exception", {error: {message: err.toString(), stack: err.stack}});
    process.emit('cleanup');
    logger.info('giving server 0.5 seconds to clean up');
    return setTimeout(function() {
      return process.exit(0);
    }, 500);
  });

  process.on('SIGTERM', function() {
    logger.info('caught SIGTERM');
    process.emit('cleanup');
    logger.info('giving server 0.5 seconds to clean up');
    return setTimeout(function() {
      return process.exit(0);
    }, 500);
  });

  process.on('SIGINT', function() {
    logger.info('caught SIGINT');
    process.emit('cleanup');
    logger.info('giving server 0.5 seconds to clean up');
    return setTimeout(function() {
      return process.exit(0);
    }, 500);
  });

  process.on('cleanup', function() {
    logger.info('cleaning up');
    server.root.stop(); // stop the server so it cleans up after itself
  });
};
