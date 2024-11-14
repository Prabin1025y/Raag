import { LoginPrompt } from '@/components/others/LoginPrompt'
import { Button } from '@/components/ui/button'
import { UseAuthStore } from '@/zustand/AuthStore'
import { LayoutDashboard } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const MainPage = () => {

  const { isAdmin, checkIsAdmin, authUser } = UseAuthStore();

  useEffect(() => {
    if (authUser) checkIsAdmin();
  }, [checkIsAdmin])

  const [loginPromptVisible, setLoginPromptVisible] = useState(false);
  const [signupPromptVisible, setSignupPromptVisible] = useState(false);


  return (
    <div className='mt-3 h-[calc(100vh-150px)] rounded-md bg-[#3B1E54] overflow-hidden'>
      <div className='h-24 bg-[#3B1E54] flex items-center px-4 justify-between'>
        <img src="/raag logo.png" alt="logo" className='h-12' />
        <LoginPrompt />
        <div className='flex gap-3'>
          <div className='bg-white rounded-full flex items-center pr-2 pl-1 gap-2 font-[Roboto] text-black font-bold hover:bg-purple-300 transition duration-200 cursor-pointer'><img src='/github.png' alt='github' className='size-6' />Contribute</div>
          {isAdmin && <Button className='bg-[#1c0e27] transition duration-200 hover:bg-[#2e163f]'><LayoutDashboard />Admin Dashboard</Button>}
          <Button className='bg-transparent transition duration-200 hover:bg-[#572d7c]'>Login</Button>
          <Button variant="secondary">SignUp</Button>
          {/* <img src="/123.jpg" alt="avatar" className='size-12 rounded-full border-black border outline outline-white mx-3' /> */}
        </div>
      </div>
    </div>
  )
}

export default MainPage