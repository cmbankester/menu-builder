var server = require('./server'),
hello = require('./controllers/hello');

server.route(hello.hello);
