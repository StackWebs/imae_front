import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface UserState {
    user: {
        userName: string;
        accessToken: string;
        expiresIn: number;
        idToken: string;
        refreshToken: string;
        tokenType: string;
    } | null;
    setUser: (user: {
        userName: string;
        accessToken: string;
        expiresIn: number;
        idToken: string;
        refreshToken: string;
        tokenType: string;
    }) => void;
    clearUser: () => void;
}

export const useStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage', // unique name
            storage: createJSONStorage(() => localStorage), // use localStorage
        }
    )
);
