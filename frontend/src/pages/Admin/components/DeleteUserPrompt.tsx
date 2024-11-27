import React, { useEffect } from 'react'
import { UseAuthStore } from '@/zustand/AuthStore';
import { Button } from '@/components/ui/button';


type Args = {
    setShowDeleteUserPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
}

const DeleteUserPrompt: React.FC<Args> = ({ setShowDeleteUserPrompt, userId }) => {

    const { deleteUser, fetchUsers, users } = UseAuthStore();

    useEffect(() => {
    }, [users.length])


    const handleDeleteUser = async () => {
        await deleteUser(userId);
        setShowDeleteUserPrompt(false);
        fetchUsers();
    }
    return (
        <div className='animate-in fade-in-0 duration-500 z-50 bg-black/60 h-screen w-screen fixed top-0 left-0 grid place-items-center'>
            <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                <h2>Do you really want remove this user?</h2>
                <div className='flex gap-3 w-full justify-end'>
                    <Button className='border bg-white text-black hover:bg-gray-200' onClick={() => setShowDeleteUserPrompt(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} className='border bg-[#4d286e]'>Remove</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserPrompt