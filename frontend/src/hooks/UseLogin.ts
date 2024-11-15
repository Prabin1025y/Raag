import { axiosInstance } from '@/lib/axios'
import { User } from '@/types';
import { useState } from 'react';
import { toast } from 'react-toastify'

type loginArgs = {
    email: string;
    password: string;
    setCurrentUser: (user: User) => void;
}

const UseLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const login = async ({ email, password, setCurrentUser }: loginArgs) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });

            if (!response || !response.data) {
                toast.error("Request failed!");
                return false;
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
            }


            setCurrentUser(response.data.result.user);

            toast.success("Logged in successfully");
            return true;
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading };
}

export default UseLogin