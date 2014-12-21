if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
require('./api-router');
require('./view-router');
