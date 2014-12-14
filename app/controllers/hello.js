exports.hello = {
  method: 'GET',
  path:'/hello',
  handler: function (request, reply) {
    reply('hello world');
  }
}
