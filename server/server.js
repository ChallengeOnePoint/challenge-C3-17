var http = require('http');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var server = http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

server.listen(3000);

var users = [];
var postIt = [];

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('newPostIt', function (objectPostIt) {
        console.log('oh another noob !');
        postIt.push(objectPostIt);
        socket.broadcast.emit('newPostIt', {postIt: objectPostIt});
    });
    
    socket.on('updatePostIt', function (object) { // object is : {title: "my TITLE', description: "my description"};
        var obj = {
            title: object.title || postIt[object.idPostIt].title,
            description: object.description || postIt[object.idPostIt].description
        };
        postIt[object.idPostIt] = obj;
        socket.broadcast.emit('updatePostIt', {postIt: obj, idPostIt: object.idPostIt});
    });
    
    socket.on('deletePostIt', function (idPostIt) {
        postIt.remove(idPostIt);
        socket.broadcast.emit('deletePostIt', {idPostIt: idPostIt});
    });
    
    socket.on('allPostIt', function () {
        socket.emit('allPostIt', {allPostIt: postIt});
    });
});

console.log('app running on port : ' + 3000);