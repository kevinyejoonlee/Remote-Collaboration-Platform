import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DocumentEditor = () => {
  const [content, setContent] = useState('');
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.error('Token is null');
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/ws/document/?token=${token}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContent(data.content);
    };

    socket.onclose = (event) => {
      console.error('Chat socket closed unexpectedly');
    };

    return () => socket.close();
  }, [token]);

  const sendMessage = (message) => {
    if (!token) {
      console.error('Token is null');
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/ws/document/?token=${token}`);
    socket.onopen = () => {
      socket.send(JSON.stringify({ 'content': message }));
    };
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          sendMessage(e.target.value);
        }}
        placeholder="Start editing the document..."
      />
    </div>
  );
};

export default DocumentEditor;
