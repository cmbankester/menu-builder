var server = require('./server'),
    hello_api = require('./controllers/api/hello'),
    logger = require('./lib/logger')('api');

server.on('response', function (request) {
  if ((tags = request.route.settings.tags) && tags.indexOf('api') >= 0) {
    var response = request.response;
    var status = response.statusCode;
    if (status >= 200 && status < 400) {
      logger.info('%s %s %s', status, request.method.toUpperCase(), request.path);
    } else {
      logger.warn('%s %s - %s %s', status, response.source.error, request.method.toUpperCase(), request.path);
    }
  }
});

function addRoute(method, path, route){
  if ('object' === typeof path){
    route = path
    path = method
    method = 'GET'
  }

  if (route.tags) {
    route.tags.push('api');
  } else {
    route.tags = ['api'];
  }

  server.route({
    method: method,
    path: path,
    config: route
  });
}

addRoute('/api/hello', hello_api.hello);
