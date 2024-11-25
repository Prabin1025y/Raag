import { Loader2, UserPen, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { axiosInstance } from '@/lib/axios'
import { toast } from 'react-toastify'
import { UseAuthStore } from '@/zustand/AuthStore'

const ChangeName = () => {

    const [newName, setNewName] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { checkAuth } = UseAuthStore();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/user/change-name", { newName });

            if (!response || !response.data)
                return toast.error("Bad Request");

            if (!response.data.success)
                return toast.error(response.data.message);

            toast.success("Name changed.");
            setShowPrompt(false);
            setNewName("");
            await checkAuth();
            setIsLoading(false);

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <div onClick={() => setShowPrompt(true)} className="flex justify-start bg-transparent  shadow-none cursor-pointer hover:bg-[#5e3385] transition duration-200 xl:px-4 xl:py-2 rounded-md items-center gap-1 text-xs xl:text-base"><UserPen className='size-4 xl:size-5' />Change Name</div>
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                        <X onClick={() => { setShowPrompt(false); setNewName("") }} className='absolute top-6 right-6 cursor-pointer ' />
                        <h2 className='text-3xl font-medium font-[Roboto]'>Change Name</h2>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="new-name">New Name</Label>
                            <Input onChange={(e) => setNewName(e.target.value)} value={newName} disabled={isLoading} type="text" id="new-name" required />
                        </div>
                        <Button disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Confirm"}</Button>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default ChangeName