import { useEffect, useState } from 'react';
import { conversationService } from '../Api/conversation/Conversation.service';
import { User, userService } from '../Api/User.service';
import AllChatFiends from './AllFriends';
import defaultProfileIcon from '../profileicon.jpg';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3001');

const ChatContainer = styled.div`
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;

const VideoCallButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:hover {
    background-color: #45a049;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  background-color: #dbdcff;
  padding: 10px;
  border-radius: 20px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const MessageInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  gap: 10px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e4eb;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:hover {
    background-color: #d1d4da;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: black;
`;

const FriendsWithChat = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  gap: 40px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusIndicator = styled.span<{ status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${props =>
    props.status === 'online' ? '#28a745' :
    props.status === 'busy' ? '#dc3545' :
    '#666'
  };
`;

const MessageBubble = styled.div<{ isOwnMessage: boolean }>`
  max-width: fit-content;
  padding: 10px 15px;
  margin-bottom: auto;
  border-radius:${(props) => (props.isOwnMessage ? '25px 25px 0px 25px' : '25px 25px 25px 0px')} ;
  background-color: ${(props) => (props.isOwnMessage ? '#7577ED' : '#EEEEF8')}; // violet for own, grey for friend
  color:  ${(props) => (props.isOwnMessage ? 'white' : 'black')};
  align-self: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')}; // Right for own, Left for friend
  word-wrap: break-word;
  box-shadow:rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

interface FriendsChatProps {
  currentUserId: string;
}

export interface Message {
  sender: string;
  text: string;
  timestamp: Date;
  Friend?: string; 
}


const FriendsChat: React.FC<FriendsChatProps> = ({ currentUserId }) => {
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [selectedFriendData, setSelectedFriendData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [videoCallRequest, setVideoCallRequest] = useState(false);

  useEffect(() => {
    const fetchFriendData = async () => {
      if (selectedFriend) {
        try {
          const friendData = await userService.getUserById(selectedFriend);
          setSelectedFriendData(friendData);

          const conversation = await conversationService.getConversation(currentUserId, selectedFriend);
          setMessages(conversation?.messages || []);
        } catch (error) {
          console.error('Error fetching friend or conversation data:', error);
        }
      }
    };
    fetchFriendData();
  }, [selectedFriend, currentUserId]);

  const handleVideoCall = () => {
    console.log('Initiating video call with', selectedFriend);
    const roomId = `${currentUserId}-${selectedFriend}`;
    
    // Emit createRoom event to create the room on the server side
    socket.emit('createRoom', { roomId });
  
    const callMessage = 'Do you accept the video call?';
    
    // Send the call message to the friend
    socket.emit('sendMessage', {
      senderId: currentUserId,
      receiverId: selectedFriend,
      message: callMessage,
      roomId, // Include roomId in the message
    });
  
    navigate(`/video?roomId=${roomId}&callInitiated=true`);
  };
  
  const handleCallResponse = (response: string) => {
    if (response === 'accept') {
      socket.emit('joinRoom', { roomId: `${currentUserId}-${selectedFriend}` });
            socket.emit('sendMessage', {
        senderId: selectedFriend,
        receiverId: currentUserId,
        message: 'I accept the call!',
        roomId: `${currentUserId}-${selectedFriend}`, 
      });
  
      setVideoCallRequest(false);
  
      navigate(`/video?callInitiated=true&roomId=${currentUserId}-${selectedFriend}`);
    } else if (response === 'reject') {
      socket.emit('sendMessage', {
        senderId: selectedFriend,
        receiverId: currentUserId,
        message: 'I reject the call!',
      });
      setVideoCallRequest(false);
    }
  };
  

  useEffect(() => {
    socket.on('receiveMessage', (data: { senderId: string; receiverId: string; message: string }) => {
      if (data.senderId === selectedFriend || data.receiverId === selectedFriend) {
        if (data.message === 'Do you accept the video call?') {
          setVideoCallRequest(true);
        } else if (data.message === 'I accept the call!') {
          navigate(`/video?callInitiated=true`);
        } else if (data.message === 'I reject the call!') {
          setVideoCallRequest(false);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: data.senderId, text: data.message, timestamp: new Date() },
          ]);
        }
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedFriend, navigate]);

  return (
    <FriendsWithChat>
      <AllChatFiends onFriendselect={setSelectedFriend} currentUserId={currentUserId} />
      <ChatContainer>
        <ChatHeader>
          {selectedFriendData ? (
            <ProfileSection>
              <ProfileImage
                src={selectedFriendData.profilePicture || defaultProfileIcon}
                alt={selectedFriendData.username}
              />
              <UserInfo>
                <h3>{selectedFriendData.username}</h3>
                <div>
                  <StatusIndicator status={selectedFriendData.status} />
                  {selectedFriendData.status}
                </div>
              </UserInfo>
            </ProfileSection>
          ) : (
            <div>Select a friend to chat with</div>
          )}
          {selectedFriend && (
            <VideoCallButton onClick={handleVideoCall}>Start Video Call</VideoCallButton>
          )}
        </ChatHeader>

        <MessageContainer>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              isOwnMessage={message.sender === currentUserId}
            >
              {message.text}
            </MessageBubble>
          ))}
        </MessageContainer>

        {videoCallRequest && (
          <div>
            <button onClick={() => handleCallResponse('accept')}>Accept</button>
            <button onClick={() => handleCallResponse('reject')}>Reject</button>
          </div>
        )}

        {selectedFriend && (
          <MessageInputContainer>
            <MessageInput>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <IconButton
                onClick={() => {
                  if (newMessage.trim()) {
                    socket.emit('sendMessage', {
                      senderId: currentUserId,
                      receiverId: selectedFriend,
                      message: newMessage,
                    });
                    setNewMessage('');
                  }
                }}
              >
                Send
              </IconButton>
            </MessageInput>
          </MessageInputContainer>
        )}
      </ChatContainer>
    </FriendsWithChat>
  );
};

export default FriendsChat;
