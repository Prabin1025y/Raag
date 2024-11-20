import LeftSidebar from '@/components/others/LeftSidebar'
import UserPanel from '@/components/others/UserPanel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { UseAuthStore } from '@/zustand/AuthStore'
import { Outlet } from 'react-router-dom'
import AudioPlayer from './components/AudioPlayer'
import AudioControls from './components/AudioControls'

const PageLayout = () => {
    const { authUser } = UseAuthStore();
    return (
        <div className='min-h-screen flex flex-col bg-[#281538] gap-3'>
            <ResizablePanelGroup direction="horizontal" className="w-screen text-white">
                <AudioPlayer />
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
            <AudioControls />
        </div>
    )
}

export default PageLayout