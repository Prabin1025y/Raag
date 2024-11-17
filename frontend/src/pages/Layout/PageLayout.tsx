import LeftSidebar from '@/components/others/LeftSidebar'
import UserPanel from '@/components/others/UserPanel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { UseAuthStore } from '@/zustand/AuthStore'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
    const { authUser } = UseAuthStore();
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

            {authUser && <ResizablePanel defaultSize={20} minSize={0} maxSize={25}>
                <UserPanel />
            </ResizablePanel>}


        </ResizablePanelGroup >
    )
}

export default PageLayout