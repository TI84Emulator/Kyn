import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_URL); // Use environment variable

function App() {
  const [message, setMessage] = useState('');
  const [presses, setPresses] = useState(0);

  useEffect(() => {
    socket.on('update', (data) => {
      setMessage(data.message);
      setPresses(data.presses);
    });
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
