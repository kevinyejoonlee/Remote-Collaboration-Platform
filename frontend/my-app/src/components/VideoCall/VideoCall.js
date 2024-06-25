// src/components/VideoCall/VideoCall.js
import React, { useEffect, useState } from 'react';
import './VideoCall.css';

const VideoCall = ({ acceptCall }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const localVideoRef = React.createRef();
  const remoteVideoRef = React.createRef();
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/video-call/');
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(ws);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      handleSignalingData(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleSignalingData = (data) => {
    switch (data.type) {
      case 'offer':
        handleOffer(data.offer);
        break;
      case 'answer':
        handleAnswer(data.answer);
        break;
      case 'candidate':
        handleCandidate(data.candidate);
        break;
      default:
        break;
    }
  };

  const handleOffer = async (offer) => {
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.send(JSON.stringify({ type: 'answer', answer }));
  };

  const handleAnswer = (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = (candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    setPeerConnection(pc);
    return pc;
  };

  const callUser = async () => {
    const pc = createPeerConnection();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    localVideoRef.current.srcObject = stream;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.send(JSON.stringify({ type: 'offer', offer }));
  };

  return (
    <div className="video-call">
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={callUser}>Call</button>
      <button onClick={acceptCall}>Accept Call</button>
    </div>
  );
};

export default VideoCall;
