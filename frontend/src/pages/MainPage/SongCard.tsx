import { useAudioStore } from "@/zustand/AudioStore";
import { UseAuthStore } from "@/zustand/AuthStore";
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
    const { featured, musicPlayed } = UseMusicStore();
    const { authUser } = UseAuthStore();
    const isCurrentSongPlaying = id === currentSong?._id;

    const handlePlay = () => {
        playAlbum(featured, index);
        if (authUser)
            musicPlayed(id);
    }

    const handlePause = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        console.log("hello");

        togglePlay();
    }

    return (
        <div onClick={handlePlay} className={`group flex gap-2 relative items-center rounded-md h-16 flex-1 hover:bg-[#6a3896] font-[Roboto] cursor-pointer transition duration-200`}>
            <img src={imageUrl} alt="song" className='rounded-md h-12 lg:h-16 aspect-square object-cover' />
            <div>
                <p className={`text-sm lg:text-base ${isCurrentSongPlaying ? "text-rose-500" : ""}`}>{title}</p>
                <p className='text-xs lg:text-sm text-[#d19dff]'>{artist}</p>
            </div>
            <div className={` hover:scale-105 animate-in slide-in-from-bottom-1 fade-in-0 duration-500 bg-green-600 hidden md:grid absolute right-2 rounded-full place-items-center p-1 lg:p-2 text-black ${isCurrentSongPlaying ? "grid" : "group-hover:grid hidden"}`}>{isCurrentSongPlaying && isPlaying ? <Pause onClick={handlePause} size={15} /> : <Play size={15} />}</div>
        </div>
    )
}

export default SongCard 