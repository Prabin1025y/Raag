import { useAudioStore } from "@/zustand/AudioStore";
import { UseMusicStore } from "@/zustand/MusicStore";
import { Pause, Play } from "lucide-react";
import React from "react";

type ArgsTypes = {
    title: string;
    artist: string;
    imageUrl: string;
    index: number;
    id: string;
}

const SongCard = ({ title, artist, imageUrl, index, id }: ArgsTypes) => {
    const { currentSong, playAlbum, isPlaying, togglePlay } = useAudioStore();
    const { featured } = UseMusicStore();
    const isCurrentSongPlaying = id === currentSong?._id;

    const handlePlay = () => {
        playAlbum(featured, index);
    }

    const handlePause = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        console.log("hello");

        togglePlay();
    }

    return (
        <div onClick={handlePlay} className="group flex gap-2 relative items-center rounded-md h-16 flex-1 hover:bg-[#6a3896] font-[Roboto] cursor-pointer transition duration-200">
            <img src={imageUrl} alt="song" className='rounded-md h-16' />
            <div>
                <p className={isCurrentSongPlaying ? "text-rose-500" : ""}>{title}</p>
                <p className='text-sm text-[#d19dff]'>{artist}</p>
            </div>
            <div className={` hover:scale-105 animate-in slide-in-from-bottom-1 fade-in-0 duration-500 bg-green-600 absolute right-2 rounded-full place-items-center p-2 text-black ${isCurrentSongPlaying ? "grid" : "group-hover:grid hidden"}`}>{isCurrentSongPlaying && isPlaying ? <Pause onClick={handlePause} size={15} /> : <Play size={15} />}</div>
        </div>
    )
}

export default SongCard 