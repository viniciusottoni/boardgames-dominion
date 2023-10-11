const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const { socketHandlers } = require('./socketHandlers');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socketHandlers(io);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
