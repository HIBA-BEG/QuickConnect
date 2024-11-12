import styled from 'styled-components';
import React, { useState } from 'react';
import SearchBarComponent from './SearchBar';
import defaultProfileIcon from '../profileicon.jpg';

const Friends = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 90%;
  height: 100vh;
`;

const FriendItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px 5px 0px 0px;
  border-bottom: 2px solid black;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#DBDCFF' : 'transparent')}; 
  &:hover {
    background-color: #ddd;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 10px;
  object-fit: cover;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AllChatProps {
  onFriendselect: (FriendName: string) => void;
}

const AllChatFiends: React.FC<AllChatProps> = ({ onFriendselect }) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null); 

  const handleFriendselect = (FriendName: string) => {
    setActiveGroup(FriendName); 
    onFriendselect(FriendName); 
  };

  return (
    <Friends>
      <SearchBarComponent />
      {['Friend 1', 'Friend 2', 'Friend 3'].map((FriendName, index) => (
        <FriendItem
          key={index}
          onClick={() => handleFriendselect(FriendName)} 
          active={activeGroup === FriendName} 
        >
          <ProfileImage src={defaultProfileIcon} alt={`${FriendName} Profile`} />
          <GroupInfo>
            <h2>{FriendName}</h2>
            <p>Last Message: Hello</p>
          </GroupInfo>
        </FriendItem>
      ))}
    </Friends>
  );
};

export default AllChatFiends;
