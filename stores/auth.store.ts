import { User } from '@/api';
import { registerUserMutation } from '@/api/@tanstack/react-query.gen';
import DevConsole from '@/utils/DevConsole';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (
    email: string | undefined,
    phoneNumber: string | undefined,
    password: string
  ) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  getToken: () => string | null;
}

const TOKEN_NAME = 'auth_token';

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      getToken: () => {
        return get().token;
      },

      login: async (email, phoneNumber, password) => {
        set({ isLoading: true });

        try {
          //  TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user: User = {
            id: 1,
            name: 'Ahmad Fauzi',
            email: email || 'ahmad@example.com',
            email_verified_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          };

          const token = TOKEN_NAME + Math.random().toString(36).substring(2);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          DevConsole.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData, password) => {
        set({ isLoading: true });
        if (!userData.email || !userData.name) {
          set({ isLoading: false });
          throw new Error('Name and Email are required');
        }

        try {
          // TODO: Replace with actual API call
          await registerUserMutation({
            body: {
              name: userData.name,
              email: userData.email,
              password: password,
              password_confirmation: password,
            },
          });

          const user: User = {
            id: 1,
            name: userData.name || 'Ahmad Fauzi',
            email: userData.email || '',
            email_verified_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          };

          const token = TOKEN_NAME + Math.random().toString(36).substring(2);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          DevConsole.error('Registration error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateProfile: data => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...data },
          });
        }
      },

      setLoading: isLoading => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
