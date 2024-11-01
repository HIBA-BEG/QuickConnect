import { FaCommentDots, FaUserFriends, FaUsers, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 80px;
  background-color: #2C2F33;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: #fff;
`;

const Icon = styled.div`
  margin: 20px 0;
  cursor: pointer;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Icon><FaCommentDots size={30} /></Icon>
      <Icon><FaUserFriends size={30} /></Icon>
      <Icon><FaUsers size={30} /></Icon>
      <Icon><FaBell size={30} /></Icon>
      <Icon><FaUser size={30} /></Icon>
      <Icon><FaSignOutAlt size={30} /></Icon>
    </SidebarContainer>
  );
};

export default Sidebar;
