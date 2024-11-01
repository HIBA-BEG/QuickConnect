import styled from 'styled-components';

const ChatContainer = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
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
  align-items: center;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const Chat = () => {
  return (
    <ChatContainer>
      <ChatHeader>
        <h2>NAME OF THE GROUP</h2>
        <div>Icons for Call & Video</div>
      </ChatHeader>
      <MessageContainer>
      </MessageContainer>
      <MessageInputContainer>
        <Input placeholder="Add New message" />
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
