const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Allow all origins (for development; be more restrictive in production)
    methods: ['GET', 'POST'],
  }
});

// Middleware for CORS
app.use(cors({
  origin: '*', // Allow all origins (for development; be more restrictive in production)
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

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other requests (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
