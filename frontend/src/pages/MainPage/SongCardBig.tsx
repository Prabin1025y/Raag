import { Song } from "@/types";
import { useAudioStore } from "@/zustand/AudioStore";
import { UseAuthStore } from "@/zustand/AuthStore";
import { UseMusicStore } from "@/zustand/MusicStore";
import { Pause, Play } from "lucide-react";

type ArgsTypes = {
    song: Song;
    index: number;
}

const SongCardBig = ({ song, index }: ArgsTypes) => {
    const { authUser } = UseAuthStore();
    const { playAlbum, currentSong, isPlaying, togglePlay } = useAudioStore();
    const { recommended, musicPlayed } = UseMusicStore();

    const isCurrentSongPlaying = currentSong?._id === song._id;

    const handlePlaySong = () => {
        if (!recommended) return;
        const songs = recommended.map(song => song.song);
        playAlbum(songs, index);
        if (authUser) {
            musicPlayed(song._id);
        }
    }

    const handlePause = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        togglePlay();
    }
    return (
        <div onClick={handlePlaySong} className='hover:bg-[#5a2f7e] relative group bg-[#4b266b] max-w-64 flex-1 rounded-2xl p-4 gap-2 flex flex-col font-[Roboto] transition duration-200 cursor-pointer'>
            <img src={song.imageUrl} alt="song" className='w-[full] rounded-lg aspect-square object-cover' />
            <p className={`font-medium ${isCurrentSongPlaying ? "text-rose-500" : ""}`}>{song.title}</p>
            <p className='text-[#d19dff]'>{song.artist}</p>
            <div className={` hover:scale-105 animate-in slide-in-from-bottom-1 fade-in-0 duration-500 bg-green-600 absolute right-2 bottom-2 rounded-full place-items-center p-2 text-black ${isCurrentSongPlaying ? "grid" : "group-hover:grid hidden"}`}>{isCurrentSongPlaying && isPlaying ? <Pause onClick={handlePause} size={15} /> : <Play size={15} />}</div>
        </div>
    )
}

export default SongCardBig