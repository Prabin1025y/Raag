import { Eye, EyeClosed, KeyRound, Loader2, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/lib/axios'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordVisible, setPasswordVisible] = useState({ currentPassword: false, newPassword: false, confirmPassword: false })
    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPasswordData({ ...passwordData, [event.target.name]: event.target.value })


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const { currentPassword, newPassword, confirmPassword } = passwordData;
            const response = await axiosInstance.post("/user/change-password", { currentPassword, newPassword, confirmPassword });

            if (!response || !response.data)
                return toast.error("Bad Request");

            if (!response.data.success)
                return toast.error(response.data.message);

            toast.success("Password changed.");
            setShowPrompt(false);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setIsLoading(false);

        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.message)
        }
    }

    const handlePromptClose = () => {
        setShowPrompt(false);
        setPasswordVisible({ currentPassword: false, newPassword: false, confirmPassword: false });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }

    const handlePasswordVisible = (passwordName: string, value: boolean) => {
        setPasswordVisible({ ...passwordVisible, [passwordName]: value })
    }

    return (
        <div>
            <div onClick={() => setShowPrompt(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 xl:px-4 xl:py-2 rounded-md items-center gap-1 text-xs xl:text-base"><KeyRound className='size-4 xl:size-5' />Change Password</div>
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                        <X onClick={handlePromptClose} className='absolute top-6 right-6 cursor-pointer ' />
                        <h2 className='text-3xl font-medium font-[Roboto]'>Change Password</h2>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className='relative'>
                                <div onClick={() => handlePasswordVisible("currentPassword", !passwordVisible.currentPassword)} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                    {passwordVisible.currentPassword ? <Eye /> : <EyeClosed />}
                                </div>
                                <Input onChange={onChangeHandler} value={passwordData.currentPassword} disabled={isLoading} name='currentPassword' type={passwordVisible.currentPassword ? "text" : "password"} id="currentPassword" required />
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className='relative'>
                                <div onClick={() => handlePasswordVisible("newPassword", !passwordVisible.newPassword)} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                    {passwordVisible.newPassword ? <Eye /> : <EyeClosed />}
                                </div>
                                <Input onChange={onChangeHandler} value={passwordData.newPassword} disabled={isLoading} name='newPassword' type={passwordVisible.newPassword ? "text" : "password"} id="newPassword" required />
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className='relative'>
                                <div onClick={() => handlePasswordVisible("confirmPassword", !passwordVisible.confirmPassword)} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                    {passwordVisible.confirmPassword ? <Eye /> : <EyeClosed />}
                                </div>
                                <Input onChange={onChangeHandler} value={passwordData.confirmPassword} disabled={isLoading} name='confirmPassword' type={passwordVisible.confirmPassword ? "text" : "password"} id="confirmPassword" required />
                            </div>
                        </div>
                        <Button disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Confirm"}</Button>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default ChangePassword