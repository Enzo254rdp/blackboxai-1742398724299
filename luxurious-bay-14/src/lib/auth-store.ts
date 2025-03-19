
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'customer' | 'seller' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (user, token) => set({ isAuthenticated: true, user, token }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
      updateUser: (userData) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, ...userData } : null 
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// For testing/development purposes - simulate login
export const simulateLogin = (role: UserRole = 'customer') => {
  const user: User = {
    id: `user-${Date.now()}`,
    name: role === 'admin' ? 'Admin User' : role === 'seller' ? 'Seller User' : 'Customer',
    email: `${role}@example.com`,
    role: role,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };
  
  useAuthStore.getState().login(user, `fake-token-${Date.now()}`);
  return user;
};

// Add to window for easy testing in browser console
if (typeof window !== 'undefined') {
  (window as any).simulateLogin = simulateLogin;
}
