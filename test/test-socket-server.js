var should = require('sould');
var io = require('socket.io-client'),
    server = require('../server');
    
var url = "http://localhost:3000";

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe('server', function () {
   it('should fill postIt array', function (done) {
       done();
   });
});