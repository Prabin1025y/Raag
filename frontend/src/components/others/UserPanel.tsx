import { UseAuthStore } from "@/zustand/AuthStore";
import { KeyRound, LogOut, UserPen, UserX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import LogOutPrompt from "./LogOutPrompt";
import { axiosInstance } from "@/lib/axios";
import ChangePassword from "./ChangePassword";
import ChangeName from "./ChangeName";

const UserPanel = () => {
    const [logoutPromptVisible, setLogoutPromptVisible] = useState(false);
    const { authUser, deleteAccount, setCurrentUser, checkIsAdmin } = UseAuthStore();

    const handleAccountDelete = async () => {
        await deleteAccount();
        const response = await axiosInstance.post("/auth/logout");
        if (response.data.success) {
            setCurrentUser(null);
            checkIsAdmin("");
            setLogoutPromptVisible(false);
        }

    }
    return (
        <div className="h-[calc(100vh-150px)] bg-[#3B1E54] mt-3 mr-3 rounded-md p-6 font-[Roboto]">
            {authUser ? <><div className="w-full flex flex-col items-center gap-3">
                <img src={authUser.imageUrl} alt="User Image" className="rounded-full outline h-32" />
                <div className="flex justify-center flex-col items-center">
                    <p className="text-xl font-semibold tracking-wide">{authUser.fullName}</p>
                    <p className="text-[#cc92ff] text-sm">{authUser.email}</p>
                </div>
            </div>
                {/* <hr />
                <div className="my-3 bg-[#4d286e] p-6 text-sm rounded-lg ">
                    <p><span className="font-semibold">Email:</span> {authUser.email}</p>
                    <p><span className="font-semibold">Since:</span> Nov 7, 2024</p>
                </div> */}
                <hr />
                <div className="my-3 bg-[#4d286e] p-6 text-sm rounded-lg flex flex-col gap-3 font-[Roboto] font-semibold">
                    <ChangeName />
                    <ChangePassword />
                    <div onClick={() => setLogoutPromptVisible(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-4 py-2 rounded-md items-center gap-1"><LogOut size={20} />Log Out</div>

                    {logoutPromptVisible && <LogOutPrompt setLogoutPromptVisible={setLogoutPromptVisible} />}

                    <AlertDialog>
                        <AlertDialogTrigger><div className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 px-4 py-2 rounded-md ic gap-1 text-red-500"><UserX size={20} />Delete Account</div></AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#4d286e] border-red-600">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">This action is Destructive</AlertDialogTitle>
                                <AlertDialogDescription className="text-white">
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-900" onClick={handleAccountDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

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