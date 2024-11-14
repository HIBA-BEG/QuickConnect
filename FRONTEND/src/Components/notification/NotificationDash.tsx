import AllChatFiends from '../AllFriends';
import React, { useState } from 'react';
import styled from 'styled-components';
import NotificationItem from './NotificationItem';
import AllChat from '../AllGroupes';


const ContainerForAll = styled.div`
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

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;
  width:100%;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 90%;
  right: 75%;
  background-color: #7289DA;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #5a6db4;
  }
`;

interface NotificationPageProps {
  currentUserId: string;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ currentUserId }) => {
  const notifications = [
    { type: 'Joined New User',sender:"Brahim oubourih", message: " a envoyer une demande d'amis", timestamp: '24 Nov 2024 at 9:20 AM' },
    { type: 'Message',sender:"Brahim oubourih", message: "a envoyer une nouvelle message", timestamp: '24 Nov 2024 at 9:20 AM' },
    { type: 'Invitation',sender:"Brahim oubourih", message: "a envoyer une invitation pour rejoindre Js pirates canal", timestamp: '24 Nov 2024 at 9:20 AM' },
  ];

  const handleFriendSelect = (friendId: string) => {
    console.log("Friend selected:", friendId);
  };
  const handleGroupSelect = (groupId: string) => {
    console.log("Group selected:", groupId);
  };

  const [isGroupChat, setIsGroupChat] = useState(true);
  
  const toggleChatType = () => {
    setIsGroupChat((prev) => !prev);
  };

  return (
    <ContainerForAll>

    <ToggleButton onClick={toggleChatType}>
        {isGroupChat ? 'Switch to Friends Chat' : 'Switch to Group Chat'}
    </ToggleButton>
      {isGroupChat? (
        <AllChatFiends onFriendselect={handleFriendSelect} currentUserId={currentUserId} />
      ) : (
        <AllChat onGroupSelect={handleGroupSelect} currentUserId={currentUserId} />
      )}

  <NotificationContainer>
      <Title>NOTIFICATION</Title>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          type={notification.type}
          sender={notification.sender}
          message={notification.message}
          timestamp={notification.timestamp}
        />
      ))}
    </NotificationContainer>
    </ContainerForAll>
  );
};

export default NotificationPage;
