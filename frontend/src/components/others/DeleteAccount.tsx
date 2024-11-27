import { Eye, EyeClosed, Loader2, UserX } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { axiosInstance } from '@/lib/axios'
import { useState } from 'react'
import { UseAuthStore } from '@/zustand/AuthStore'

const DeleteAccount = () => {
    const [password, setPassword] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { deleteAccount, setCurrentUser, checkIsAdmin } = UseAuthStore();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const success = await deleteAccount(password);
        if (success) {
            const response = await axiosInstance.post("/auth/logout");
            if (response.data.success) {
                setCurrentUser(null);
                checkIsAdmin("");
                setShowPrompt(false);
            }
        }
        setIsLoading(false);
    }

    const handleCancel = () => {
        setShowPrompt(false);
        setPasswordVisible(false);
        setPassword("");
    }

    return (
        <div>
            <div onClick={() => setShowPrompt(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 xl:px-4 xl:py-2 rounded-md ic gap-1 text-red-500 text-xs xl:text-base"><UserX className='size-4 xl:size-5' />Delete Account</div>
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                        <h2 className='text-xl font-medium font-[Roboto] text-red-600'>This Action is Destructive!!</h2>
                        <p className='font-normal font-[Roboto] '>This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.</p>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="userPassword">Enter your password to continue</Label>
                            <div className='relative'>
                                <div onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                    {passwordVisible ? <Eye /> : <EyeClosed />}
                                </div>
                                <Input onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type={passwordVisible ? "text" : "password"} id="userPassword" required />
                            </div>
                        </div>
                        <div className='flex w-full justify-end gap-3'>
                            <Button disabled={isLoading} onClick={handleCancel} className='bg-white hover:bg-gray-300 text-black transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Cancel"}</Button>
                            <Button disabled={isLoading} className='bg-red-700 hover:bg-red-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Delete"}</Button>
                        </div>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default DeleteAccount