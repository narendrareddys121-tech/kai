import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { STORAGE_KEYS } from '../constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication - in production, this would call a real API
const mockUsers: { [email: string]: { password: string; user: User } } = {
  'demo@kai.app': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@kai.app',
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      createdAt: Date.now(),
      subscription: 'pro',
      preferences: {
        theme: 'system',
        notifications: true,
        language: 'en',
        defaultAnalysisMode: 'text'
      }
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = mockUsers[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      const user = mockUser.user;
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockUsers[email.toLowerCase()]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: Date.now(),
      subscription: 'free',
      preferences: {
        theme: 'system',
        notifications: true,
        language: 'en',
        defaultAnalysisMode: 'text'
      }
    };

    // Store in mock database
    mockUsers[email.toLowerCase()] = { password, user: newUser };
    
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.user);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
