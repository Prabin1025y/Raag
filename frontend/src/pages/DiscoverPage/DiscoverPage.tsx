import TopBar from '../MainPage/TopBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Song } from '@/types'
import formatTime from '@/utils/formatTime'
import { useAudioStore } from '@/zustand/AudioStore'
import { UseAuthStore } from '@/zustand/AuthStore'
import { UseMusicStore } from '@/zustand/MusicStore'
import { Clock, Heart, Search } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'

const DiscoverPage = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

    const { currentSong, playAlbum, isPlaying } = useAudioStore();
    const { songs, favourites, musicPlayed, addToFavourite, removeFromFavourite, fetchFavourites, fetchAllSongs } = UseMusicStore();
    const { authUser } = UseAuthStore();

    const handlePlaySong = (index: number, songId: string) => {
        if (!songs) return;
        playAlbum(filteredSongs, index);
        if (authUser)
            musicPlayed(songId);
    }

    const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);



    }

    useEffect(() => {
        fetchFavourites();
        fetchAllSongs();
    }, [])

    useEffect(() => {
        const searchSongs = songs.filter(song => song.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredSongs(searchSongs);
        if (searchText === "")
            setFilteredSongs(songs);

        console.log(filteredSongs);
        console.log(searchText);
    }, [searchText])


    useEffect(() => {
        if (songs)
            setFilteredSongs(songs);
    }, [songs])
    return (
        <div className='mt-3 h-[calc(100vh-120px)] flex flex-col rounded-md bg-[#3B1E54] overflow-hidden'>
            <TopBar />
            <ScrollArea className="flex-1 px-2 lg:px-[10%] py-12 bg-gradient-to-b to-[#3B1E54] via-[#3B1E54] from-[#4e2870]">
                <div className='mx-[10%] mb-12 border rounded-full overflow-hidden h-10 flex items-center px-2 gap-3'>
                    <Search />
                    <input onChange={onChangeHandler} value={searchText} type="text" className='w-full bg-transparent outline-none' placeholder='Search for songs' />
                </div>
                {filteredSongs.map((song, index) => {
                    const isCurrentPlayingSong = song._id === currentSong?._id;
                    const isFavourite = favourites.some(s => song._id === s._id);

                    const handleFavouriteChange = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                        event.stopPropagation();
                        if (isFavourite)
                            await removeFromFavourite(song._id)
                        else
                            await addToFavourite(song._id);
                        await fetchFavourites();
                    }

                    return (<React.Fragment key={song._id}>
                        <div onClick={() => handlePlaySong(index, song._id)} className={`grid grid-cols-[25px_5fr_1fr] md:grid-cols-[50px_3fr_1fr_1fr] lg:grid-cols-[50px_2fr_2fr_1fr] md:px-2 lg:px-4 items-center rounded-md hover:bg-[#492668] ${isCurrentPlayingSong ? "text-rose-500" : "text-[#f2e6ff]"} font-[Poppins] md:mx-4 transition duration-200 cursor-pointer`}>
                            {isCurrentPlayingSong ? <img src={isPlaying ? "/gif/sound wave.gif" : "/wave paused.png"} alt="wave" className='invert mx-auto mix-blend-screen' /> : <p className="mx-auto text-xs">{index + 1}</p>}
                            <div className='flex items-center font-[Roboto] gap-2 px-1 lg:px-3 py-1 '>
                                <img className='size-8 lg:size-12 rounded-md object-cover' src={song.imageUrl} alt="album thumbnail" />
                                <div className='flex flex-col justify-center'>
                                    <p className='text-nowrap md:text-wrap text-sm lg:text-base'>{song.title}</p>
                                    <p className='text-xs lg:text-sm text-[#BC87FA]'>{song.artist}</p>
                                </div>
                            </div>
                            <p className="mx-auto text-[0.5rem] leading-3 md:text-xs hidden md:flex gap-1 items-center"><Clock className="size-2 md:size-3" />{formatTime(song.duration)}</p>
                            <Heart fill={isFavourite ? "white" : "none"} className='text-white mx-auto size-4 md:size-5' onClick={handleFavouriteChange} size={20} />
                        </div>
                        <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                    </React.Fragment>)
                })}

            </ScrollArea>
        </div>
    )
}

export default DiscoverPage