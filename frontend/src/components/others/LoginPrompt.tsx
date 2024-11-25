import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Eye, EyeClosed, Loader2, X } from 'lucide-react'
import UseLogin from '@/hooks/UseLogin'
import { UseAuthStore } from '@/zustand/AuthStore'
import { UseLoginStore } from '@/zustand/LoginStore'


export const LoginPrompt = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const { setLoginPromptVisible } = UseLoginStore();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { setCurrentUser } = UseAuthStore();
    const { login, isLoading } = UseLogin();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUserData({ ...userData, [event.target.name]: event.target.value });

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password } = userData;

        const success = await login({ email, password, setCurrentUser });

        if (success)
            setLoginPromptVisible(false);
    }

    const onPromptCloseHandler = () => {
        setLoginPromptVisible(false);
        setPasswordVisible(false);
        setUserData({ email: "", password: "" })
    }

    return (
        <div className='animate-in z-50 duration-500 fade-in-0 fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler}>
                <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                    <X onClick={onPromptCloseHandler} className='absolute top-6 right-6 cursor-pointer ' />
                    <h2 className='text-3xl font-medium font-[Roboto]'>Login to your account</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input disabled={isLoading} onChange={onChangeHandler} value={userData.email} type="email" id="email" name='email' placeholder="Email" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className='relative'>
                            <div onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                {passwordVisible ? <Eye /> : <EyeClosed />}
                            </div>
                            <Input disabled={isLoading} onChange={onChangeHandler} value={userData.password} type={passwordVisible ? "text" : "password"} id="password" name='password' placeholder="Password" required />
                        </div>
                    </div>
                    <Button disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Login"}</Button>
                </div>
            </form>
        </div>
    )
}
