import styled from 'styled-components';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 90%;
  height: 100vh;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #DBDCFF;
  padding: 10px;
  border-radius: 20px;
  margin: 10px 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  padding: 3px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #999;
  margin: 0 10px;
`;

const GroupItem = styled.div<{ active?: boolean }>`
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
  onGroupSelect: (groupName: string) => void;
}

const AllChat: React.FC<AllChatProps> = ({ onGroupSelect }) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null); 

  const handleGroupSelect = (groupName: string) => {
    setActiveGroup(groupName); 
    onGroupSelect(groupName); 
  };

  return (
    <Groups>
      <SearchBar>
        <IconWrapper>
          <FaSearch size={18} />
        </IconWrapper>
        <Input type="text" placeholder="Search for New friends" />
        <Divider />
        <IconWrapper>
          <FaTrashAlt size={18} />
        </IconWrapper>
      </SearchBar>
      {['Group 1', 'Group 2', 'Group 3'].map((groupName, index) => (
        <GroupItem
          key={index}
          onClick={() => handleGroupSelect(groupName)} 
          active={activeGroup === groupName} 
        >
          <ProfileImage src="https://via.placeholder.com/40" alt={`${groupName} Profile`} />
          <GroupInfo>
            <h2>{groupName}</h2>
            <p>Last Message: Hello</p>
          </GroupInfo>
        </GroupItem>
      ))}
    </Groups>
  );
};

export default AllChat;
