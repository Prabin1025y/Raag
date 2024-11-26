import LeftSidebar from '@/components/others/LeftSidebar'
import UserPanel from '@/components/others/UserPanel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { UseAuthStore } from '@/zustand/AuthStore'
import { Outlet } from 'react-router-dom'
import AudioPlayer from './components/AudioPlayer'
import AudioControls from './components/AudioControls'
import { useEffect, useState } from 'react'

const PageLayout = () => {
    const { authUser } = UseAuthStore();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [leftPanelSize, setLeftPanelSize] = useState({ defaultSize: 20, minSize: 10, maxSize: 25 });
    const [rightPanelSize, setRightPanelSize] = useState({ defaultSize: 25, maxSize: 25 });

    useEffect(() => {
        if (screenWidth < 768) { // Mobile screens
            setLeftPanelSize({
                defaultSize: 25,
                minSize: 25,
                maxSize: 25,
            });
        } else if (screenWidth >= 768 && screenWidth < 1128) { // Tablet screens
            setLeftPanelSize({
                defaultSize: 20,
                minSize: 20,
                maxSize: 20,
            });
            setRightPanelSize({
                defaultSize: 20,
                maxSize: 20,
            });
        } else { // Desktop screens
            setLeftPanelSize({
                defaultSize: 20,
                minSize: 15,
                maxSize: 25,
            });
            setRightPanelSize({
                defaultSize: 25,
                maxSize: 25,
            });
        }
    }, [screenWidth])


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <div className='min-h-screen flex flex-col bg-[#281538] gap-3'>
            <ResizablePanelGroup direction="horizontal" className="w-screen text-white">
                <AudioPlayer />
                <ResizablePanel defaultSize={leftPanelSize.defaultSize} minSize={leftPanelSize.minSize} maxSize={leftPanelSize.maxSize}>
                    <LeftSidebar />
                </ResizablePanel>

                <ResizableHandle className="w-3 bg-[#281538]" />

                <ResizablePanel className='pr-3 md:pr-0'>
                    <Outlet />
                </ResizablePanel>
                {authUser && screenWidth > 768 &&
                    <>
                        <ResizableHandle className="w-3 bg-[#281538]" />
                        <ResizablePanel className='overflow-x-clip' defaultSize={rightPanelSize.defaultSize} minSize={0} maxSize={rightPanelSize.maxSize}>
                            <UserPanel />
                        </ResizablePanel>
                    </>
                }


            </ResizablePanelGroup >
            <AudioControls />
        </div >
    )
}

export default PageLayout