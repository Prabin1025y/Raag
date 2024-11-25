import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Eye, EyeClosed, Loader2, X } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import UseSignup from '@/hooks/UseSignup'
import { UseAuthStore } from '@/zustand/AuthStore'
import { UseLoginStore } from '@/zustand/LoginStore'


export const SignupPrompt = () => {

    const { setSignupPromptVisible } = UseLoginStore();

    const [passwordVisible, setPasswordVisible] = useState({ password: false, confirmPassword: false });
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { setCurrentUser } = UseAuthStore();
    const { signup, isLoading } = UseSignup();



    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUserData({ ...userData, [event.target.name]: event.target.value });



    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { fullName, email, password, confirmPassword } = userData;
        const success = await signup({ fullName, email, password, confirmPassword, setCurrentUser });

        if (success)
            setSignupPromptVisible(false);
    }

    return (
        <div className='z-50 animate-in duration-500 fade-in-0 absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} >
                <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                    <X onClick={() => setSignupPromptVisible(false)} className='absolute top-6 right-6 cursor-pointer ' />
                    <h2 className='text-3xl font-medium font-[Roboto]'>Create an account</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input disabled={isLoading} onChange={onChangeHandler} value={userData.fullName} type="text" id="fullName" name='fullName' placeholder="Full Name" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input disabled={isLoading} onChange={onChangeHandler} value={userData.email} type="email" id="email" name='email' placeholder="Email" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className='relative'>
                            <div onClick={() => setPasswordVisible({ ...passwordVisible, password: !passwordVisible.password })} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                {passwordVisible.password ? <Eye /> : <EyeClosed />}
                            </div>
                            <Input disabled={isLoading} onChange={onChangeHandler} value={userData.password} type={passwordVisible.password ? "text" : "password"} id="password" name='password' placeholder="Password" required />
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className='relative'>
                            <div onClick={() => setPasswordVisible({ ...passwordVisible, confirmPassword: !passwordVisible.confirmPassword })} className='absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center cursor-pointer'>
                                {passwordVisible.confirmPassword ? <Eye /> : <EyeClosed />}
                            </div>
                            <Input disabled={isLoading} onChange={onChangeHandler} value={userData.confirmPassword} type={passwordVisible.confirmPassword ? "text" : "password"} id="confirmPassword" name='confirmPassword' placeholder="Confirm Password" required />
                        </div>
                    </div>
                    <div className="items-top flex space-x-2">
                        <Checkbox disabled={isLoading} className='border-white' id="terms1" required />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                    <Button disabled={isLoading} type='submit' className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Create Account"}</Button>
                </div>
            </form>
        </div>
    )
}
