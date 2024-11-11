import React from 'react';
import styled from 'styled-components';

interface NotificationProps {
  sender: string;
  type: string;
  message: string;
  timestamp: string;
}

const NotificationCard = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const Badge = styled.span<{ type: string }>`
  align-self: flex-start;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  background-color: ${({ type }) =>
    type === 'Joined New User' ? '#8A2BE2' :
    type === 'Message' ? '#4B4DFF' :
    type === 'Invitation' ? '#6633FF' : '#333'};
`;

const Message = styled.p`
  font-size: 14px;
  color: #333;
  margin: 10px 0;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button<{ color: string }>`
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: ${({ color }) => color};
  &:hover {
    opacity: 0.9;
  }
`;

const NotificationItem: React.FC<NotificationProps> = ({ type,sender, message, timestamp }) => {
  return (
    <NotificationCard>
      <div className='flex flex-col'>
        <Badge type={type}>{type}</Badge>
        <Message><strong>{sender}</strong> {message}</Message>
        <Timestamp>{timestamp}</Timestamp>
      </div>

      {/* Conditionally render buttons only if the type is not 'Message' */}
      {type !== 'Message' && (
        <Actions>
          <Button color="#28a745">Accept</Button>
          <Button color="#dc3545">Refuse</Button>
        </Actions>
      )}
    </NotificationCard>
  );
};

export default NotificationItem;
