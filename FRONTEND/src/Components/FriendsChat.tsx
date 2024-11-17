import { useEffect, useState } from 'react';
import { conversationService } from '../Api/conversation/Conversation.service';
import { User, userService } from '../Api/User.service';
import AllChatFiends from './AllFriends';
import defaultProfileIcon from '../profileicon.jpg';
import { io } from 'socket.io-client';
import styled from 'styled-components';

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

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  background-color: #DBDCFF;
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
  background-color: #E0E4EB;
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

interface FriendsChatProps {
  currentUserId: string;
}

export interface Message {
  sender: string;
  text: string;
  timestamp: Date;
  Friend?: string; 
}

const socket = io('http://localhost:3001');

const FriendsChat: React.FC<FriendsChatProps> = ({ currentUserId }) => {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [selectedFriendData, setSelectedFriendData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

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

  useEffect(() => {
    socket.on('receiveMessage', (data: { senderId: string; receiverId: string; message: string }) => {
      if (data.senderId === selectedFriend || data.receiverId === selectedFriend) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: data.senderId, text: data.message, timestamp: new Date() },
        ]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedFriend]);

  const handleSendMessage = async () => {
    if (newMessage && selectedFriend) {
      const newMessageData: Message = {
        sender: currentUserId,
        text: newMessage,
        timestamp: new Date(),
      };

      try {
        socket.emit('sendMessage', {
          senderId: currentUserId,
          receiverId: selectedFriend,
          message: newMessage,
        });

        setMessages([...messages, newMessageData]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <FriendsWithChat>
      <AllChatFiends onFriendselect={setSelectedFriend} currentUserId={currentUserId} />
      <ChatContainer>
        <ChatHeader>
          {selectedFriendData ? (
            <ProfileSection>
              <ProfileImage
                src={selectedFriendData.profilePicture || defaultProfileIcon}
                alt={`${selectedFriendData.firstName} Profile`}
              />
              <UserInfo>
                <h2 className="font-roboto font-bold text-[30px] text-[#132C33]">
                  {`${selectedFriendData.firstName} ${selectedFriendData.lastName}`}
                </h2>
                <p>@{selectedFriendData.username}</p>
              </UserInfo>
            </ProfileSection>
          ) : (
            <h2 className="font-roboto font-bold text-[30px] text-[#132C33]">
              Select a friend to start chatting
            </h2>
          )}
        </ChatHeader>
        <MessageContainer>
          {messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.sender === currentUserId ? 'You' : selectedFriendData?.firstName}:</strong> {message.text}
            </div>
          ))}
        </MessageContainer>
        <MessageInputContainer>
          <MessageInput>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <IconButton onClick={handleSendMessage}>Send</IconButton>
          </MessageInput>
        </MessageInputContainer>
      </ChatContainer>
    </FriendsWithChat>
  );
};

export default FriendsChat;
