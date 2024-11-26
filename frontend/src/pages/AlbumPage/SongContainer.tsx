import { ScrollArea } from '@/components/ui/scroll-area';
import { Album } from '@/types';
import formatTime from '@/utils/formatTime';
import { useAudioStore } from '@/zustand/AudioStore';
import { UseAuthStore } from '@/zustand/AuthStore';
import { UseMusicStore } from '@/zustand/MusicStore';
import { Clock, Heart } from 'lucide-react';
import React, { useEffect } from 'react'

type SongContainerProps = {
    currentAlbum: Album | null;
}

const SongContainer: React.FC<SongContainerProps> = ({ currentAlbum }) => {

    const { authUser } = UseAuthStore();
    const { playAlbum, currentSong, isPlaying } = useAudioStore();
    const { addToFavourite, favourites, fetchFavourites, removeFromFavourite, musicPlayed } = UseMusicStore();

    const handlePlaySong = (index: number, songId: string) => {

        if (!currentAlbum) return;
        playAlbum(currentAlbum.songs, index);
        if (authUser)
            musicPlayed(songId);
    }

    useEffect(() => {
        fetchFavourites();
    }, [])


    return (
        <ScrollArea className='h-1/2'>
            {/* <div className="grid grid-cols-[50px_2fr_2fr_1fr] px-4 text-[#BC87FA] font-[Poppins]">
                <p className="mx-auto">S.N.</p>
                <p className="ml-2">Title</p>
                <p className="mx-auto">Artist</p>
                <p className="mx-auto">Duration</p>
            </div>
            <hr className="mx-4 my-1 border-[#BC87FA]" /> */}
            {
                currentAlbum?.songs.map((song, index) => {
                    const isCurrentPlayingSong = currentSong?._id === song._id;
                    const isFavourite = favourites.some(s => song._id === s._id);

                    const handleFavouriteChange = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                        event.stopPropagation();
                        if (isFavourite)
                            await removeFromFavourite(song._id)
                        else
                            await addToFavourite(song._id);
                        await fetchFavourites();
                    }

                    return (
                        <React.Fragment key={song._id}>
                            <div onClick={() => handlePlaySong(index, song._id)} className={`grid grid-cols-[50px_3fr_1fr_1fr] lg:grid-cols-[50px_2fr_2fr_1fr] px-2 lg:px-4 items-center rounded-md hover:bg-[#492668] ${isCurrentPlayingSong ? "text-rose-500" : "text-[#f2e6ff]"} font-[Poppins] mx-4 transition duration-200 cursor-pointer`}>
                                {isCurrentPlayingSong ? <img src={isPlaying ? "/gif/sound wave.gif" : "/wave paused.png"} alt="wave" className='invert mx-auto mix-blend-screen' /> : <p className="mx-auto text-xs">{index + 1}</p>}
                                <div className='flex items-center font-[Roboto] gap-2 px-1 lg:px-3 py-1 '>
                                    <img className='size-8 lg:size-12 rounded-md object-cover' src={song.imageUrl} alt="album thumbnail" />
                                    <div className='flex flex-col justify-center'>
                                        <p className='text-sm'>{song.title}</p>
                                        <p className='text-xs lg:text-sm text-[#BC87FA]'>{song.artist}</p>
                                    </div>
                                </div>
                                <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{formatTime(song.duration)}</p>
                                <Heart fill={isFavourite ? "white" : "none"} className='text-white mx-auto' onClick={handleFavouriteChange} size={20} />
                            </div>
                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                        </React.Fragment >
                    )
                })
            }

        </ScrollArea>
    )
}

export default SongContainer