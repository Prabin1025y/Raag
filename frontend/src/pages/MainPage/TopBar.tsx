import { LoginPrompt } from '@/components/others/LoginPrompt';
import { SignupPrompt } from '@/components/others/SignupPrompt';
import { Button } from '@/components/ui/button';
import { UseAuthStore } from '@/zustand/AuthStore';
import { LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TopBar = () => {
    const { isAdmin, checkIsAdmin, authUser } = UseAuthStore();

    useEffect(() => {

        if (authUser) checkIsAdmin(authUser._id);
    }, [authUser])
    const [loginPromptVisible, setLoginPromptVisible] = useState(false);
    const [signupPromptVisible, setSignupPromptVisible] = useState(false);
    return (
        <div className='h-20 bg-[#3B1E54] flex items-center px-4 justify-between'>
            <img src="/raag logo.png" alt="logo" className='h-12' />
            {loginPromptVisible && <LoginPrompt setLoginPromptVisible={setLoginPromptVisible} />}
            {signupPromptVisible && <SignupPrompt setSignupPromptVisible={setSignupPromptVisible} />}
            <div className='flex gap-3 items-center'>
                <Link target='_blank' to="https://github.com/Prabin1025y/Raag" className='bg-white h-8 rounded-full flex items-center pr-2 pl-1 gap-2 font-[Roboto] text-black font-bold hover:bg-purple-300 transition duration-200 cursor-pointer'><img src='/github.png' alt='github' className='size-6' />Contribute</Link>
                {isAdmin && <Button className='bg-[#1c0e27] transition duration-200 hover:bg-[#2e163f]'><LayoutDashboard />Admin Dashboard</Button>}
                {!authUser && <Button onClick={() => setLoginPromptVisible(true)} className='bg-transparent transition duration-200 hover:bg-[#572d7c]'>Login</Button>}
                {!authUser && <Button onClick={() => setSignupPromptVisible(true)} variant="secondary">SignUp</Button>}
                {authUser && <img src={authUser?.imageUrl || "/default profile.jpg"} alt="avatar" className='size-12 rounded-full border-black border outline outline-white mx-3' />}
            </div>
        </div>
    )
}

export default TopBar