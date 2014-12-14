var server = require('./server'),
    hello_api = require('./controllers/api/hello');

server.route(hello_api.hello);
