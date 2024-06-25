import React, { useEffect, useState } from 'react';
import './DocumentEditor.css'
const DocumentEditor = () => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/document/`);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setContent(data.content);
    };
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const updateContent = (newContent) => {
    setContent(newContent);
    socket.send(JSON.stringify({ content: newContent }));
  };

  return (
    <textarea
      value={content}
      onChange={(e) => updateContent(e.target.value)}
    />
  );
};

export default DocumentEditor;
