import styled from 'styled-components';
import Sidebar from '../../Components/Sidebar';
import GroupeMessage from '../../Components/Chat';
import InfoMessage from '../../Components/GroupInfo';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2C2F33;
`;

const Main = () => {
  return (
    <MainContainer>
      <Sidebar />
      <GroupeMessage />
      <InfoMessage />
    </MainContainer>
  );
};

export default Main;
