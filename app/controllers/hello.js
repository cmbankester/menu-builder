exports.hello = {
  handler: function (request, reply) {
    reply.view('hello/index');
  }
}
