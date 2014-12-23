var port, start = new Date;
var logger = require('./lib/logger')('server');

// require('sugar');

var fs        = require('fs'),
    server    = require('./lib/hapi'),
    app       = server.settings.app,
    env       = app.env,
    port_type = app.socket != null ? 'socket' : 'port';

require('./lib/process')(server);

if (port_type === 'socket') {
  if (fs.existsSync(app.socket)) {
    fs.unlinkSync(app.socket);
  }

  port = app.socket;
} else {
  port = app.port;
}

server.connection({
  host: 'localhost',
  port: port
});

server.views({
  path: 'app/views',
  engines: {
    jade: require('jade')
  }
});

server.on('start', function(){
  if (app.socket) {
    // Allow nginx to read the socket file
    require('fs').chmod(app.socket, 0777);
  }

  var time = new Date - start;
  logger.info(app.name + " started on " + port_type + " " + port + " (" + env + " mode) in " + time + "ms");
});

server.on('log', function (event, tags) {
  if (tags.error) {
    logger.error('Server error: ' + (event.data || 'unspecified'));
  }
});

server.on('response', function (request) {
  // api/view routers each have their own request logger, so we just need to
  // handle the requests that weren't handled by the routers
  if (!(tags = request.route.settings.tags) || tags.indexOf('view') === tags.indexOf('view') === -1) {
    var response = request.response;
    var status = response.statusCode;
    if (status >= 200 && status < 400) {
      logger.info('%s %s %s', status, request.method.toUpperCase(), request.path);
    } else {
      logger.warn('%s %s - %s %s', status, response.source.error, request.method.toUpperCase(), request.path);
    }
  }
});

//
// server.on('request-error', function(request, event, tags){
//   logger.error(event)
// });

server.start();

module.exports = server;
