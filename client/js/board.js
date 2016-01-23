(function (global) {

    var socket;

    board = {
        init: function () {
            socket = io.connect('http://' + document.location.host + ':3000');
            console.log(socket);
        },
        allPostIt: function (callback) {
            socket.on('allPostIt', function(data){
                console.log('users::all on');
                callback(data);
            });
            console.log('users::all emit');
            socket.emit('allPostIt');
        },        
        syncPostIt: function (callback) {
            socket.on('newPostIt', function(data){
                console.log('users::syncPostIt on');
                callback(data);
            });
        },
        newPostIt: function (data) {
            console.log('users::save emit');
            socket.emit('newPostIt', data);
        },
        updatePostIt: function (data, callback) {
            socket.on('updatePostIt', function(data){
                console.log('users::updatePostIt on');
                callback(data);
            });
        },        
        deleteAllPostIt: function (callback) {
            socket.on('deletePostIt', function(id){
                console.log('users::deleteAllPostIt on');
                callback(data);
            });
        },                
        deletePostIt: function (id) {
            socket.emit('deletePostIt', id);
        },
    }

    global.board = board;

}(this));