import React, { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const VideoCall: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001'); 
    setSocket(socketInstance);

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    
    socketInstance.on('user-joined', async () => {
        console.log("hello world!");


      if (!peerConnection.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('Media stream obtained:', stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, stream));
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socketInstance.emit('offer', { sdp: offer, roomCode });
    });

    socketInstance.on('offer', async (sdp: RTCSessionDescriptionInit) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socketInstance.emit('answer', { sdp: answer, roomCode });
    });

    socketInstance.on('answer', async (sdp: RTCSessionDescriptionInit) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketInstance.emit('ice-candidate', { candidate: event.candidate, roomCode });
      }
    };

    socketInstance.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        const [remoteStream] = event.streams;
        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    return () => {
      socketInstance.disconnect();
    };
  }, [roomCode]);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8); 
    setRoomCode(code);
  };

  const joinRoom = () => {
    if (socket && roomCode) {
      socket.emit('join', roomCode);
      setIsInRoom(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {!isInRoom ? (
        <>
          <button onClick={generateRoomCode} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Créer une nouvelle salle
          </button>
          <input
            type="text"
            placeholder="Entrez le code de la salle"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button onClick={joinRoom} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Rejoindre la salle
          </button>
        </>
      ) : (
        <div className="flex space-x-4">
          <video ref={localVideoRef} autoPlay muted className="w-1/2 border-2 border-gray-300 rounded-md shadow-md" />
          <video ref={remoteVideoRef} autoPlay className="w-1/2 border-2 border-gray-300 rounded-md shadow-md" />
        </div>
      )}
    </div>
  );
};

export default VideoCall;
