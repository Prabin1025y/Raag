import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

type signupArgs = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    setCurrentUser: (user: User) => void;
}

const UseSignup = () => {

    const [isLoading, setIsLoading] = useState(false);

    const signup = async ({ fullName, email, password, confirmPassword, setCurrentUser }: signupArgs) => {
        if (!fullName || !email || !password || !confirmPassword)
            return toast.error("Please fill in all the fields")

        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/auth/signup", { fullName, email, password, confirmPassword });

            if (!response.data.success) {
                toast.error(response.data.message)
                return false;
            }

            setCurrentUser(response.data.result.user);

            toast.success("signup successful");
            return true;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { signup, isLoading }

}

export default UseSignup