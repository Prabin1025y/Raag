import LeftSidebar from '@/components/others/LeftSidebar'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { axiosInstance } from '@/lib/axios'
import { UseAuthStore } from '@/zustand/AuthStore'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
    const { setCurrentUser, authUser, checkIsAdmin } = UseAuthStore();
    return (
        <ResizablePanelGroup direction="horizontal" className="min-h-screen w-screen text-white bg-[#281538]">

            <ResizablePanel defaultSize={20} minSize={10} maxSize={25}>
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="w-3 bg-[#281538]" />

            <ResizablePanel>
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="w-3 bg-[#281538]" />

            <ResizablePanel defaultSize={20} minSize={0} maxSize={25}>
                <div className="h-[calc(100vh-150px)] bg-[#3B1E54] mt-3 mr-3 rounded-md">
                    {authUser && <Button onClick={async () => {
                        const response = await axiosInstance.post("/auth/logout");
                        if (response.data.success) {
                            setCurrentUser(null);
                            checkIsAdmin("");
                        }
                    }}>Log Out</Button>}
                </div>
            </ResizablePanel>


        </ResizablePanelGroup >
    )
}

export default PageLayout