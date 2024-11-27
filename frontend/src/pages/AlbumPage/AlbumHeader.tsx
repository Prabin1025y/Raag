import { Album } from '@/types'
import { useAudioStore } from '@/zustand/AudioStore';
import { Pause, Play } from 'lucide-react'
import React from 'react'

type AlbumHeaderProps = {
    currentAlbum: Album | null;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ currentAlbum }) => {
    const { playAlbum, isPlaying, currentSong, togglePlay } = useAudioStore();
    const isPlayingSongInAlbum = currentAlbum?.songs.some(s => currentSong?._id === s._id);

    const handleAlbumPlay = () => {
        if (!currentAlbum) return;

        if (isPlayingSongInAlbum) {
            togglePlay();
        }
        else {
            playAlbum(currentAlbum?.songs, 0);
        }
    }
    return (
        <div className={`h-1/2 bg-no-repeat bg-cover bg-center relative`} style={{ backgroundImage: `url(${currentAlbum?.imageUrl || ""})` }}>
            <div className="z-10 flex gap-8 items-end absolute bottom-12 left-[9%]">
                <img src={currentAlbum?.imageUrl} alt="name" className="size-32 lg:size-48 rounded-lg" />
                <div className="flex flex-col pb-6 font-[Poppins]">
                    <p className="text-2xl lg:text-4xl font-semibold ">{currentAlbum?.title}</p>
                    <p className="text-[#BC87FA] font-semibold text-sm lg:text-base">{currentAlbum?.artist} • {`${currentAlbum?.songs.length} ${currentAlbum?.songs.length === 1 ? "song" : "songs"}`}</p>
                </div>
            </div>
            <img src="/raag logo green.png" alt="logo" className='h-12 md:h-16 opacity-40 absolute top-6 right-6 z-10' />
            <div onClick={handleAlbumPlay} className="animate-in slide-in-from-bottom-2 fade-in-0 duration-200 cursor-pointer right-[10%] bottom-[20%] hidden md:flex size-12 absolute z-10 justify-center items-center bg-[#E0EB28] text-black rounded-full hover:scale-105 transition">
                {(isPlaying && isPlayingSongInAlbum) ? <Pause size={15} /> : <Play size={15} />}
            </div>
            <div className="z-0 h-[calc(100%+5px)] absolute -left-[2px] top-0 w-[calc(100%+5px)] bg-gradient-to-t from-[#3B1E54] to-[#00000080] pointer-events-none" aria-hidden={true} />
        </div>
    )
}

export default AlbumHeader