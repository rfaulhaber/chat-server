const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

const { createStore } = require('redux');
const reducer = require('./lib/reducer').default;
const store = createStore(reducer);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('listening on *:3000');
});

io.on('connect', function(socket) {
    console.log('new connection found');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log('message received', msg);
    });
});