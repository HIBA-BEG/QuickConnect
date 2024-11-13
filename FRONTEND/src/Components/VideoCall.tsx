import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let peerConnection : RTCPeerConnection | null;
const VideoCall: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState('');
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isRoomJoined) return;
  
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);
  
    peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
      ],
    });
  
    socketInstance.emit('join', roomId);
    startMediaStream();
  
    socketInstance.on('offer', async (sdp) => {
      if (!peerConnection) return;
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socketInstance.emit('answer', { sdp: answer, roomId });
      } catch (error) {
        console.error("Failed to set remote description or create answer:", error);
      }
    });
  
    socketInstance.on('answer', async (sdp) => {
      if (!peerConnection) return;
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
      } catch (error) {
        console.error("Failed to set remote description on answer:", error);
      }
    });
  
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketInstance.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };
  
    socketInstance.on('ice-candidate', async (candidate) => {
      if (peerConnection?.remoteDescription) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  
    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  
    socketInstance.on('user-joined', async () => {
      if (!peerConnection) return;
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socketInstance.emit('offer', { sdp: offer, roomId });
    });
  
    return () => {
      socketInstance.disconnect();
      peerConnection?.close();
    };
  }, [roomId, isRoomJoined]);
  

  const startMediaStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => peerConnection?.addTrack(track, stream));
    }).catch((error) => {
      console.error("Error accessing media devices.", error);
      alert("Could not access media devices.");
    });
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      setIsRoomJoined(true);
    } else {
      alert('Please enter a valid room ID.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {!isRoomJoined ? (
        <div className="flex flex-col items-center space-y-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Join Room
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 p-4">
          <video
            className="w-full md:w-1/2 max-w-md border-2 border-gray-300 rounded-md shadow-md"
            ref={localVideoRef}
            autoPlay
            muted
          />
          <video
            className="w-full md:w-1/2 max-w-md border-2 border-gray-300 rounded-md shadow-md"
            ref={remoteVideoRef}
            autoPlay
          />
        </div>
      )}
    </div>
  );
};

export default VideoCall;
