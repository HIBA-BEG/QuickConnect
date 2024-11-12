import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { userService } from '../Api/User.service';
import defaultProfileIcon from '../profileicon.jpg';


const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #1E1E1E;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 70vh;
  overflow-y: auto;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #EEEEF8;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 23px;
  font-weight: 500;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #DBDCFF;
  cursor: pointer;
  font-size: 23px;
  font-weight: 500;
  
  &:hover {
    background-color: #EEEEF8;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

interface UserSearchPopupProps {
    onClose: () => void;
}

const UserSearchPopup: React.FC<UserSearchPopupProps> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(term.toLowerCase()) ||
            user.lastName.toLowerCase().includes(term.toLowerCase()) ||
            user.firstName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <PopupOverlay onClick={onClose}>
            <PopupContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <FaTimes />
                </CloseButton>

                <SearchInput>
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        autoFocus
                    />
                    <FiSearch size={25} style={{ marginRight: '10px' , color: '#7577ED', fontWeight: 'semibold'}} />
                </SearchInput>

                <UserList>
                    {filteredUsers.map(user => (
                        <UserItem key={user._id}>
                            <img
                                src={user.profilePicture || defaultProfileIcon}
                                alt={user.lastName}
                                style={{ width: 50, height: 50, borderRadius: '20%', marginRight: 10 }}
                            />
                            <div>
                                <div>{user.username}</div>
                                <div style={{ fontSize: '0.8em', color: '#666' }}>{user.lastName} {user.firstName}</div>
                            </div>
                        </UserItem>
                    ))}
                </UserList>
            </PopupContent>
        </PopupOverlay>
    );
};

export default UserSearchPopup;