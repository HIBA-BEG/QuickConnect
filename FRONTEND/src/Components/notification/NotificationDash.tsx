import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotificationItem from './NotificationItem';
import { userService, User, FriendRequest } from '../../Api/User.service';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';

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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

interface NotificationPageProps {
  currentUserId: string;
}


const NotificationPage: React.FC<NotificationPageProps> = ({ currentUserId }) => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGroupChat, setIsGroupChat] = useState(true);
  const [socket, setSocket] = useState<any>(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('User localStorage ', user);

    console.log('Setting up WebSocket for user:', user.username, user._id);

    const newSocket = io('http://localhost:3001');

    newSocket.on('connect', () => {
      // console.log('Connected to WebSocket server');
      newSocket.emit('register', user._id);
      // console.log('Emitted register event with userId:', user._id);

    });

    newSocket.on('friendRequest', (request) => {
      console.log('Received friend request via WebSocket:', request);

      setFriendRequests(prev => {
        // console.log('Previous requests:', prev);
        const newRequests = [...prev, request];
        // console.log('Updated requests:', newRequests);
        return newRequests;
      });

      Swal.fire({
        icon: 'info',
        title: 'New Friend Request',
        text: `${request.from.firstName} ${request.from.lastName} sent you a friend request`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    });

    // newSocket.on('error', (error) => {
    //   console.error('WebSocket error:', error);
    // });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from WebSocket server');
    // });

    setSocket(newSocket);

    return () => {
      // console.log('Cleaning up WebSocket connection');
      newSocket.close();
    };
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await userService.acceptFriendRequest(requestId);
      setFriendRequests(prev => prev.filter(req => req._id !== requestId));
      // console.log('Friend request accepted');

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = await userService.getUserById(user._id);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      await Swal.fire({
        icon: 'success',
        title: 'Friend Request Accepted!',
        text: 'You are now friends',
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });


    } catch (error) {
      console.error('Error accepting friend request:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to accept friend request',
        showConfirmButton: true,
        position: 'center'
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Do you want to reject this friend request?',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#7678ED',
        cancelButtonColor: '#DBDCFF',
      });

      if (result.isConfirmed) {
        await userService.rejectFriendRequest(requestId);
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
        // console.log('Friend request rejected');

        await Swal.fire({
          icon: 'success',
          title: 'Friend Request Rejected',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to reject friend request',
        showConfirmButton: true,
        position: 'center'
      });

    }
  };

  const handleFriendSelect = (friendId: string) => {
    console.log("Friend selected:", friendId);
  };

  const handleGroupSelect = (groupId: string) => {
    console.log("Group selected:", groupId);
  };

  const toggleChatType = () => {
    setIsGroupChat((prev) => !prev);
  };

  return (
    <ContainerForAll>
      <NotificationContainer>
        <Title>NOTIFICATIONS</Title>

        {isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!isLoading && !error && friendRequests.length === 0 && (
          <EmptyState>No new notifications</EmptyState>
        )}

        {friendRequests.map((request) => (
          <NotificationItem
            key={request._id}
            type="Friend Request"
            sender={`${request.from.firstName} ${request.from.lastName}`}
            message={`@${request.from.username} sent you a friend request`}
            timestamp={new Date(request.createdAt).toLocaleString()}
            onAccept={() => handleAcceptRequest(request._id)}
            onReject={() => handleRejectRequest(request._id)}
          />
        ))}
      </NotificationContainer>
    </ContainerForAll>
  );
};

export default NotificationPage;
