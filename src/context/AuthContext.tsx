import { createContext } from 'react';
import type { UserCredential } from 'firebase/auth';
import type { CurrentUser } from '../types/CurrentUser';

type AuthContextValue = {
    user: CurrentUser | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);