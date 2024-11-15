const apiUrl = 'http://localhost:3001';

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  status: string;
  channels: any[];
  friends: any[];
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequest {
  _id: string;
  from: User;
  to: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const toUser = await userService.getUserById(toUserId);

    console.log('Request payload:', {
      from: userData,
      to: toUser,
    });

    try {
      const response = await fetch(`${apiUrl}/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: userData,
          to: toUser
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

  getPendingFriendRequests: async (userId: string): Promise<FriendRequest[]> => {
    try {
      const response = await fetch(`${apiUrl}/friend-request/pending/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("getPendingFriendRequests: ",data);
      return data;
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
      throw error;
    }
  },

  acceptFriendRequest: async (requestId: string): Promise<void> => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await fetch(`${apiUrl}/friend-request/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Accept friend request response:', data);
      return data;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      throw error;
    }
  },

  rejectFriendRequest: async (requestId: string): Promise<void> => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await fetch(`${apiUrl}/friend-request/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Accept friend request response:', data);
      return data;
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      throw error;
    }
  }
};