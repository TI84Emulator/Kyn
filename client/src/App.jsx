import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'); // Fallback to localhost for development

function App() {
  const [message, setMessage] = useState('');
  const [presses, setPresses] = useState(0);

  useEffect(() => {
    // Listen for 'update' events from the server
    socket.on('update', (data) => {
      setMessage(data.message);
      setPresses(data.presses);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.off('update');
    };
  }, []);

  const handleClick = () => {
    socket.emit('buttonClick');
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me!</button>
      <p>Message from server: {message}</p>
      <p>Total presses: {presses}</p>
    </div>
  );
}

export default App;
