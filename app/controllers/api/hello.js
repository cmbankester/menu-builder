exports.hello = {
  method: 'GET',
  path:'/api/hello',
  handler: function (request, reply) {
    reply('hello world');
  }
}
