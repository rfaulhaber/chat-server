const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);
const shortid = require('shortid');

const { createStore } = require('redux');
const reducer = require('./lib/reducer').default;
const store = createStore(reducer);

const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', function(error) {
    console.log('error', error);
});

const port = process.env.PORT || 3000;

io.on('connect', function(socket) {
    console.log('new connection found');

    const userID = shortid.generate();
    console.log('generated unique id:', userID);

    users.insertOne({
        id: userID
    }).then(({insertedId}) => {
        console.log('inserted id: ', insertedId);
        socket.send({id: userID});
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log('message received', msg);
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('saveID', function(msg) {
        console.log('save id msg', msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});

function initializeDB() {
    return MongoClient.connect(mongodbURL)
        .then(client => client.db(dbname))
        .catch(err => {
            throw err;
        });
}
