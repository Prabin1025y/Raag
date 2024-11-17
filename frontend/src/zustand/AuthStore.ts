import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { toast } from 'react-toastify';
import { create } from 'zustand';

type AuthStore = {
    isAdmin: boolean;
    users: User[];
    authUser: User | null;


    fetchUsers: () => Promise<void>;
    setCurrentUser: (user: User | null) => void;
    checkIsAdmin: (userId: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    deleteAccount: () => Promise<void>;
}

export const UseAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    users: [],
    authUser: null,

    fetchUsers: async () => {
        try {
            const response = await axiosInstance.get("/user");
            if (!response.data.success)
                throw new Error(response.data.message);

            set({ users: response.data.result.users });
        } catch (error: any) {
            toast.error(error.message);
        }
    },

    setCurrentUser: (user) => set({ authUser: user }),

    checkIsAdmin: async (userId) => {
        try {

            const response = await axiosInstance.get(`/auth/checkAdmin/${userId}`);
            if (!response) {
                toast.error("Bad Request");
                return;
            }

            if (!response.data.success) {
                set({ isAdmin: false });
                toast.error(response.data.message);
                return;
            }
            // console.log(response.data);

            if (response.data.result.isAdmin)
                return set({ isAdmin: true });

            set({ isAdmin: false });
        } catch (error: any) {
            set({ isAdmin: false });
            toast.error(error.response.data.message);
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/checkAuth");
            if (!response) {
                toast.error("Bad Request");
                return
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return
            }

            set({ authUser: response.data.result.user })

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },

    deleteAccount: async () => {
        try {
            const response = await axiosInstance.delete("/auth/delete-account");

            if (!response || !response.data) {
                toast.error("Bad request");
                return
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return
            }

            console.log(response.data);
            

            toast.success("Account deleted");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
}))