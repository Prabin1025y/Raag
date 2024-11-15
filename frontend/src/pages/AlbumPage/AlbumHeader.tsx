import { Album } from '@/types'
import { Triangle } from 'lucide-react'
import React from 'react'

type AlbumHeaderProps = {
    currentAlbum: Album | null;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ currentAlbum }) => {
    return (
        <div className="h-1/2 bg-[url(/123.jpg)] bg-no-repeat bg-cover bg-center relative">
            <div className="z-10 flex gap-8 items-end relative left-[9%] top-[40%]">
                <img src="/123.jpg" alt="name" className=" size-48 rounded-lg" />
                <div className="flex flex-col pb-6 font-[Poppins]">
                    <p className="text-4xl font-semibold ">{currentAlbum?.title}</p>
                    <p className="text-[#BC87FA] font-semibold">{currentAlbum?.artist} • {`${currentAlbum?.songs.length} ${currentAlbum?.songs.length === 1 ? "song" : "songs"}`}</p>
                </div>
            </div>
            <img src="/raag logo green.png" alt="logo" className='h-16 opacity-40 absolute top-6 right-6 z-10' />
            <div className="animate-in slide-in-from-bottom-2 fade-in-0 duration-200 cursor-pointer right-[10%] bottom-[20%] flex size-12 absolute z-10 justify-center items-center bg-[#E0EB28] text-black rounded-full">
                <Triangle size={20} className="rotate-90 translate-x-[2px]" />
            </div>
            <div className="z-0 h-full absolute left-0 top-0 w-full bg-gradient-to-t from-[#3B1E54] to-[#00000080] pointer-events-none" aria-hidden={true} />
        </div>
    )
}

export default AlbumHeader