const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import CORS

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Use '*' for open access or specify allowed domains
    methods: ['GET', 'POST'],
  }
});

// Middleware for CORS
app.use(cors({
  origin: '*', // Use '*' for open access or specify allowed domains
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

// Use environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
