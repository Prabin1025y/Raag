import React from 'react'
import { Button } from '../ui/button'
import { axiosInstance } from '@/lib/axios';
import { UseAuthStore } from '@/zustand/AuthStore';


type Args = {
    setLogoutPromptVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogOutPrompt: React.FC<Args> = ({ setLogoutPromptVisible }) => {

    const { checkIsAdmin, setCurrentUser } = UseAuthStore();

    const handleLogOut = async () => {
        const response = await axiosInstance.post("/auth/logout");
        if (response.data.success) {
            setCurrentUser(null);
            checkIsAdmin("");
            setLogoutPromptVisible(false);
        }
    }
    return (
        <div className='animate-in fade-in-0 duration-500 z-50 bg-black/80 h-screen w-screen absolute top-0 left-0 grid place-items-center'>
            <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                <h2>Do you really want to log out?</h2>
                <div className='flex gap-3 w-full justify-end'>
                    <Button className='border bg-white text-black hover:bg-gray-200' onClick={() => setLogoutPromptVisible(false)}>Cancel</Button>
                    <Button onClick={handleLogOut} className='border bg-[#4d286e]'>Log Out</Button>
                </div>
            </div>
        </div>
    )
}

export default LogOutPrompt