var Hapi = require('hapi');

// Create a server with a host and port
module.exports = server = new Hapi.Server({
  app: require('../config/app')
});
