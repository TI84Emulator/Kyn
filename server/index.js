const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import CORS

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
}));

let presses = 0;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('buttonClick', () => {
    presses += 1;
    io.emit('update', { message: 'Button clicked!', presses });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
