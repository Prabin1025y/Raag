import { UseAuthStore } from "@/zustand/AuthStore";
import { LogOut } from "lucide-react";
import { useState } from "react";
import LogOutPrompt from "./LogOutPrompt";
import ChangePassword from "./ChangePassword";
import ChangeName from "./ChangeName";
import DeleteAccount from "./DeleteAccount";

const UserPanel = () => {
    const [logoutPromptVisible, setLogoutPromptVisible] = useState(false);
    const { authUser } = UseAuthStore();


    return (
        <div className="h-[calc(100vh-120px)] bg-[#3B1E54] mt-3 mr-3 rounded-md p-2 py-12 xl:p-6 font-[Roboto] overflow-x-hidden">
            {authUser ? <>
                <div className="w-full flex flex-col items-center gap-3 min-w-[121px] xl:min-w-[226px]">
                    <img src={authUser.imageUrl} alt="User Image" className="rounded-full outline border border-black w-16 min-w-16 xl:min-w-32 xl:w-32 aspect-square" />
                    <div className="flex justify-center flex-col items-center">
                        <p className="text-base xl:text-xl font-semibold tracking-wide">{authUser.fullName}</p>
                        <p className="text-[#cc92ff] text-[0.5rem] xl:text-sm">{authUser.email}</p>
                    </div>
                </div>
                <hr className="min-w-[121px] xl:min-w-[226px]" />
                <div className="my-3 min-w-[121px] xl:min-w-[226px] bg-[#4d286e] py-4 px-2 xl:p-6 text-sm rounded-xl flex flex-col gap-4 xl:gap-3 font-[Roboto] font-semibold">
                    <ChangeName />
                    <ChangePassword />
                    <div onClick={() => setLogoutPromptVisible(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-0 xl:px-4 xl:py-2 rounded-md items-center gap-1 text-xs xl:text-base"><LogOut className="size-4 xl:size-5" />Log Out</div>

                    {logoutPromptVisible && <LogOutPrompt setLogoutPromptVisible={setLogoutPromptVisible} />}
                    <DeleteAccount />
                </div></>
                : "Login"}
        </div>
    )
}

export default UserPanel

{/* {authUser && <Button onClick={async () => {
    const response = await axiosInstance.post("/auth/logout");
    if (response.data.success) {
        setCurrentUser(null);
        checkIsAdmin("");
    }
}}>Log Out</Button>} */}