const apiUrl = 'http://localhost:3001';

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  status: UserStatus;
  lastSeen: Date;
  avatar?: string;
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${apiUrl}/user`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },



  sendFriendRequest: async (toUserId: string): Promise<void> => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const fromUserId = userData._id;

    console.log('Request payload:', {
      from: fromUserId,
      to: toUserId,
    });

    try {
      const response = await fetch(`${apiUrl}/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromUserId,
          to: toUserId
        }),
      });

      const responseData = await response.json();

      console.log("responseData: ",responseData);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send friend request');
      }

      return responseData; 
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  },
  
  getMyFriends: async (id: string): Promise<User> => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}/friends`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching my friends:', error);
      throw error;
    }
  }  
};