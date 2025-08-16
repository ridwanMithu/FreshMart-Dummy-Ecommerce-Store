// Mock authentication using localStorage
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

const USERS_KEY = 'freshmart_users';
const CURRENT_USER_KEY = 'freshmart_current_user';

// Initialize default users
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const defaultUsers: User[] = [
      {
        id: '1',
        email: 'user@freshmart.com',
        role: 'user',
        name: 'Regular User'
      },
      {
        id: '2',
        email: 'admin@freshmart.com',
        role: 'admin',
        name: 'Admin User'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

export const login = (email: string, password: string): User | null => {
  initializeUsers();
  
  // For demo purposes, accept password "12345" for both accounts
  if (password !== '12345') {
    return null;
  }
  
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin' || false;
};