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
    imageFile: File | null;
}

const UseSignup = () => {

    const [isLoading, setIsLoading] = useState(false);

    const signup = async ({ fullName, email, password, confirmPassword, setCurrentUser, imageFile }: signupArgs) => {
        if (!fullName || !email || !password || !confirmPassword)
            return toast.error("Please fill in all the fields")

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
            if (imageFile) {
                formData.append("imageFile", imageFile);
            }
            const response = await axiosInstance.post("/auth/signup", formData);

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