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

export const register = (name: string, email: string, password: string): User | null => {
  initializeUsers();
  
  // Check if user already exists
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return null; // User already exists
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    role: 'user',
    name
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  return newUser;
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

export const updateUserProfile = (name: string, email: string): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name,
      email
    };
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const updatedUser = users[userIndex];
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
  
  return null;
};