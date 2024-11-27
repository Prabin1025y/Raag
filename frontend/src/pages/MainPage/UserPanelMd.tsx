import ChangeName from "@/components/others/ChangeName";
import ChangePassword from "@/components/others/ChangePassword";
import DeleteAccount from "@/components/others/DeleteAccount";
import LogOutPrompt from "@/components/others/LogOutPrompt";
import { UseAuthStore } from "@/zustand/AuthStore";
import { LayoutDashboard, LogOut, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const UserPanelMd = ({ setShowUserPanel }: { setShowUserPanel: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [logoutPromptVisible, setLogoutPromptVisible] = useState(false);
    const { authUser } = UseAuthStore();
    const { isAdmin } = UseAuthStore();

    const divRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        divRef.current?.classList.add("translate-x-96");
        setTimeout(() => {
            setShowUserPanel(false);
        }, 300);
    }


    return (
        <div ref={divRef} className="animate-in slide-in-from-right-96 fade-in-0 duration-300 h-[calc(100vh-120px)] bg-[#3B1E54] mt-3 mr-3 rounded-md p-2 py-12 xl:p-6 font-[Roboto] overflow-x-hidden fixed top-0 right-0 z-40 w-[60vw] shadow-2xl md:hidden">
            {authUser ? <>
                <div className="w-full flex flex-col items-center gap-3 min-w-[121px] xl:min-w-[226px]">
                    <img src={authUser.imageUrl} alt="User Image" className="rounded-full outline w-16 min-w-16 xl:min-w-32 xl:w-32 aspect-square" />
                    <div className="flex justify-center flex-col items-center">
                        <p className="text-base xl:text-xl font-semibold tracking-wide">{authUser.fullName}</p>
                        <p className="text-[#cc92ff] text-[0.5rem] xl:text-sm">{authUser.email}</p>
                    </div>
                </div>
                <hr className="min-w-[121px] xl:min-w-[226px]" />
                <div className="my-3 min-w-[121px] xl:min-w-[226px] bg-[#4d286e] py-4 px-2 xl:p-6 text-sm rounded-xl flex flex-col gap-4 xl:gap-3 font-[Roboto] font-semibold">
                    <Link target='_blank' to="https://github.com/Prabin1025y/Raag" className=' rounded-lg flex items-center pr-2 pl-1 gap-2 font-[Roboto] text-white font-bold hover:bg-[#5e3385] transition duration-200 cursor-pointer text-xs '><img src='/github.png' alt='github' className='size-5 invert' />Contribute</Link>
                    {isAdmin && <Link to="/admin" className=' rounded-lg flex items-center pr-2 pl-1 gap-2 font-[Roboto] text-white font-bold hover:bg-[#5e3385] transition duration-200 cursor-pointer text-xs'><LayoutDashboard size={20} /> Admin Dashboard</Link>}
                </div>
                <div className="my-3 min-w-[121px] xl:min-w-[226px] bg-[#4d286e] py-4 px-2 xl:p-6 text-sm rounded-xl flex flex-col gap-4 xl:gap-3 font-[Roboto] font-semibold">
                    <ChangeName />
                    <ChangePassword />
                    <div onClick={() => setLogoutPromptVisible(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-0 xl:px-4 xl:py-2 rounded-md items-center gap-1 text-xs xl:text-base"><LogOut className="size-4 xl:size-5" />Log Out</div>

                    {logoutPromptVisible && <LogOutPrompt setLogoutPromptVisible={setLogoutPromptVisible} />}
                    <DeleteAccount />
                </div>
            </>
                : "Login"}
            <X onClick={handleClose} className="absolute top-4 left-4 cursor-pointer" />
        </div>
    )
}

export default UserPanelMd
