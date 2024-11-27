import { LoginPrompt } from '@/components/others/LoginPrompt';
import { SignupPrompt } from '@/components/others/SignupPrompt';
import UserPanel from '@/components/others/UserPanel';
import { Button } from '@/components/ui/button';
import { UseAuthStore } from '@/zustand/AuthStore';
import { UseLoginStore } from '@/zustand/LoginStore';
import { LayoutDashboard, Menu } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserPanelMd from './UserPanelMd';

const TopBar = () => {
    const { isAdmin, checkIsAdmin, authUser } = UseAuthStore();
    const navigate = useNavigate();
    const [showUserPanel, setShowUserPanel] = useState(false);

    useEffect(() => {

        if (authUser) checkIsAdmin(authUser._id);
    }, [authUser])

    const { loginPromptVisible, signupPromptVisible, setLoginPromptVisible, setSignupPromptVisible } = UseLoginStore();
    // const [loginPromptVisible, setLoginPromptVisible] = useState(false);
    // const [signupPromptVisible, setSignupPromptVisible] = useState(false);
    return (
        <div className='min-h-20 bg-[#3B1E54] flex items-center px-4 justify-between'>
            <img src="/raag logo.png" alt="logo" className='h-8 md:h-12' />
            {loginPromptVisible && <LoginPrompt />}
            {signupPromptVisible && <SignupPrompt />}
            <div className='flex gap-1 lg:gap-3 items-center'>
                <Link target='_blank' to="https://github.com/Prabin1025y/Raag" className='bg-white h-8 rounded-full hidden md:flex items-center pr-2 pl-1 gap-2 font-[Roboto] text-black font-bold hover:bg-purple-300 transition duration-200 cursor-pointer  '><img src='/github.png' alt='github' className='size-5 lg:size-6' /><span className='text-xs' >Contribute</span></Link>
                {isAdmin && <Button onClick={() => navigate("/admin")} className='bg-[#1c0e27] transition duration-200 hover:bg-[#2e163f] text-xs lg:text-base hidden md:flex'><LayoutDashboard /> Admin <span className='hidden lg:inline'>Dashboard</span></Button>}
                {!authUser && <Button onClick={() => setLoginPromptVisible(true)} className='bg-transparent transition duration-200 hover:bg-[#572d7c]'>Login</Button>}
                {!authUser && <Button onClick={() => setSignupPromptVisible(true)} variant="secondary">SignUp</Button>}
                {authUser && <img src={authUser?.imageUrl || "/default profile.jpg"} alt="avatar" className='size-12 rounded-full border-black border outline outline-white mx-3 hidden md:block' />}
                <Menu onClick={() => setShowUserPanel(true)} className={`md:hidden ${!authUser && "hidden"}`} />
            </div>
            {showUserPanel && <UserPanelMd setShowUserPanel={setShowUserPanel} />}
        </div>
    )
}

export default TopBar