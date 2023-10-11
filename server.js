const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importe o pacote cors

const app = express();

app.use(cors()); // Use o middleware cors

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Permita qualquer origem
    methods: ["GET", "POST"] // Métodos permitidos
  }
});

const rooms = {};

class Card {
    constructor(name, text, cost, category) {
        this.name = name;
        this.text = text;
        this.cost = cost;
        this.category = category;
    }
}

class Player {
    constructor(nickname) {
        this.nickname = nickname;

        this.deck = this.initializeDeck();
        this.hand = [];
    }

    initializeDeck() {
        let deck = [
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO')
        ];
        return this.shuffle(deck);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    drawCards(num) {
        this.hand = this.deck.splice(0, num);
    }
}

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

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
