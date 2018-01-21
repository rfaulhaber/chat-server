const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);
const shortid = require('shortid');

const { createStore } = require('redux');
const reducer = require('./lib/reducer').default;
const store = createStore(reducer);

const port = process.env.PORT || 3000;

io.on('connect', function(socket) {
    console.log('new connection found');

    const userID = shortid.generate();
    console.log('generated unique id:', userID);

    socket.send({id: userID});

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log('message received', msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});
