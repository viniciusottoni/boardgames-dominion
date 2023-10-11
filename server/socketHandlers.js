const { rooms } = require('./state');
const Player = require('../models/player');

const socketHandlers = (io) => {
    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ roomName, nickname }) => {
            if (!rooms[roomName]) {
                rooms[roomName] = [];
            }
    
            if (!rooms[roomName].players) {
                rooms[roomName].players = [];
            }
    
            let player = rooms[roomName].players.find(player => player.nickname === nickname);
            if (!player) {
                player = new Player(nickname);
                player.drawCards(5);
                rooms[roomName].players.push(player);
            }
            
            socket.emit('receiveHand', player.hand);
            socket.join(roomName);
            io.to(roomName).emit('updatePlayers', rooms[roomName].players.map(player => player.nickname));
        });
    
        socket.on('disconnect', () => {
            for (const room in rooms) {
                const playerIndex = rooms[room].indexOf(socket.nickname); 
                if (playerIndex > -1) {
                    rooms[room].splice(playerIndex, 1);
                    io.to(room).emit('updatePlayers', rooms[room]);
                }
            }
        });
    
        socket.on('checkRoomExistence', (roomName, callback) => {
            if (rooms[roomName]) {
                callback(true);
            } else {
                callback(false);
            }
        });
    });
};

module.exports = {
    socketHandlers
};