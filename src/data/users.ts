export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@cleandrop.com',
    name: 'Admin User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'customer-1',
    email: 'sarah@example.com',
    name: 'Sarah Mitchell',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'customer',
    createdAt: '2024-06-15T10:30:00Z',
  },
  {
    id: 'customer-2',
    email: 'james@example.com',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'customer',
    createdAt: '2024-07-20T14:45:00Z',
  },
  {
    id: 'customer-3',
    email: 'emily@example.com',
    name: 'Emily Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'customer',
    createdAt: '2024-08-10T09:15:00Z',
  },
  {
    id: 'customer-4',
    email: 'michael@example.com',
    name: 'Michael Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'customer',
    createdAt: '2024-09-05T16:20:00Z',
  },
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

export const getCustomers = (): User[] => {
  return mockUsers.filter(u => u.role === 'customer');
};
