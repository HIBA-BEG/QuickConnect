import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../../Components/Sidebar';

const ProfileContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  height: 100vh;
  background-color: #2C2F33;
`;

const MainContent = styled.div`
  flex: 2;
  background-color: #F9FAFC;
  color: black;
  border-radius: 10px;
  padding: 20px;
`;

const SideContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileCard = styled.div`
  background-color: #F9FAFC;
  border-radius: 10px;
  padding: 20px;
`;

const RewardsCard = styled.div`
background-color: #DBDCFF;
  border-radius: 10px;
  padding: 20px;
//   color: white;
`;

const Header = styled.div`
  font-family: "Roboto Mono", monospace;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & h1{
    font-weight: bold;
    font-size: 48px;
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  & label{
    font-weight: bold;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  background-color: #DBDCFF;
  width: 100%;
`;

const CommentsSection = styled.div`
  background-color: #DBDCFF;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButton = styled.button`
  background-color: #7289DA;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  
  &:hover {
    background-color: #5B73C7;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const Profile: React.FC = () => {
    const [userData, setUserData] = useState({
        firstName: 'brahim',
        lastName: 'brahim',
        userName: 'Ibra',
        email: 'brahim@gamil.com'
    });

    const [comments, setComments] = useState([
        { id: 1, user: 'Hiba', avatar: '/path/to/avatar.jpg', text: "Let's GOooo!!!!", timestamp: '21 20 Nov 2024 9:20 AM' },
        // Add more comments as needed
    ]);

    return (
        <ProfileContainer>
            <Sidebar />
            <MainContent>
                <Header>
                    <h1>Hey, {userData.userName.toUpperCase()}</h1>
                    <button>⋮</button>
                </Header>

                <UserInfo>
                    <InputGroup>
                        <label>First Name:</label>
                        <Input value={userData.firstName} readOnly />
                    </InputGroup>
                    <InputGroup>
                        <label>Last Name:</label>
                        <Input value={userData.lastName} readOnly />
                    </InputGroup>
                    <InputGroup>
                        <label>User Name:</label>
                        <Input value={userData.userName} readOnly />
                    </InputGroup>
                    <InputGroup>
                        <label>Email:</label>
                        <Input value={userData.email} readOnly />
                    </InputGroup>
                </UserInfo>

                <h2>All Comments</h2>
                <CommentsSection>
                    {comments.map(comment => (
                        <Comment key={comment.id}>
                            <Avatar src={comment.avatar} alt={comment.user} />
                            <div>
                                <strong>{comment.user}</strong>
                                <p>{comment.text}</p>
                                <small>{comment.timestamp}</small>
                            </div>
                        </Comment>
                    ))}
                </CommentsSection>
            </MainContent>

            <SideContent>
                <ProfileCard>
                    <ProfileImage>
                        <img src="/default-profile.jpg" alt="Profile" />
                    </ProfileImage>
                    <UploadButton>Upload Image</UploadButton>
                    <Stats>
                        <div>
                            <h3>200</h3>
                            <p>Positive Feedback</p>
                        </div>
                        <div>
                            <h3>230</h3>
                            <p>Comments</p>
                        </div>
                    </Stats>
                </ProfileCard>

                <RewardsCard>
                    <h2>Rewards</h2>
                    <div>
                        <p>⭐ 230 You can Pin messages</p>
                        <p>⭐ 100 You can delete messages of someone else</p>
                    </div>
                </RewardsCard>
            </SideContent>
        </ProfileContainer>
    );
};

export default Profile;