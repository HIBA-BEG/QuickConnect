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
  }
};