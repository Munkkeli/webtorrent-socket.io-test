var io = require('socket.io')();
var stream = io.of('/media');

stream.on('connection', function (socket) {
  socket.on('request', function (data) {
    var id = new Buffer(data.id, 'base64').toString('ascii');
    console.log('request', id);
    return stream.to(id).emit('request', (new Buffer(socket.id).toString('base64')));
  });

  socket.on('offer', function (data) {
    var id = new Buffer(data.id, 'base64').toString('ascii');
    console.log('offer', id);
    return stream.to(id).emit('offer', data.offer);
  });

  socket.on('answer', function (data) {
    var id = new Buffer(data.id, 'base64').toString('ascii');
    console.log('answer', id);
    return stream.to(id).emit('answer', { id: (new Buffer(socket.id).toString('base64')), answer: data.answer });
  });
});

io.listen(5638);
