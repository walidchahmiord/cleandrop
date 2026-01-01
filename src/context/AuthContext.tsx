import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '@/data/users';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'customer' | 'admin') => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = async (email: string, password: string, role: 'customer' | 'admin'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo login - in real app this would validate against database
    if (role === 'admin') {
      const adminUser = mockUsers.find(u => u.role === 'admin');
      if (adminUser && email === 'admin@cleandrop.com') {
        setUser(adminUser);
        toast({
          title: 'Welcome back, Admin!',
          description: 'You have been logged in successfully.',
        });
        return true;
      }
    } else {
      // For demo, any email works for customer
      const customerUser: User = {
        id: `customer-${Date.now()}`,
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      setUser(customerUser);
      toast({
        title: 'Welcome to CleanDrop!',
        description: 'You have been logged in successfully.',
      });
      return true;
    }

    toast({
      title: 'Login Failed',
      description: 'Invalid credentials. Please try again.',
      variant: 'destructive',
    });
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `customer-${Date.now()}`,
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    toast({
      title: 'Account Created!',
      description: 'Welcome to the CleanDrop family.',
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'See you soon!',
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
      toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved.',
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
