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
        <div className="h-[calc(100vh-120px)] bg-[#3B1E54] mt-3 mr-3 rounded-md p-6 font-[Roboto]">
            {authUser ? <><div className="w-full flex flex-col items-center gap-3">
                <img src={authUser.imageUrl} alt="User Image" className="rounded-full outline h-32" />
                <div className="flex justify-center flex-col items-center">
                    <p className="text-xl font-semibold tracking-wide">{authUser.fullName}</p>
                    <p className="text-[#cc92ff] text-sm">{authUser.email}</p>
                </div>
            </div>
                <hr />
                <div className="my-3 bg-[#4d286e] p-6 text-sm rounded-lg flex flex-col gap-3 font-[Roboto] font-semibold">
                    <ChangeName />
                    <ChangePassword />
                    <div onClick={() => setLogoutPromptVisible(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-4 py-2 rounded-md items-center gap-1"><LogOut size={20} />Log Out</div>

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