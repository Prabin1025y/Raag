import { Button } from "@/components/ui/button"
import SongListSkeleton from "@/skeletons/SongListSkeleton"
import { Song } from "@/types"
import formatTime from "@/utils/formatTime"
import { useAudioStore } from "@/zustand/AudioStore"
import { UseAuthStore } from "@/zustand/AuthStore"
import { UseLoginStore } from "@/zustand/LoginStore"
import { UseMusicStore } from "@/zustand/MusicStore"
import { Clock, Heart } from "lucide-react"

type Args = {
    favourites: Song[];
    isLoading: boolean;
}

const FavouriteSection = ({ favourites, isLoading }: Args) => {
    const { authUser } = UseAuthStore();
    const { playAlbum, currentSong, isPlaying } = useAudioStore();
    const { addToFavourite, removeFromFavourite, fetchFavourites, musicPlayed } = UseMusicStore();
    const { setLoginPromptVisible } = UseLoginStore();


    const handlePlaySong = (index: number = 0, songId: string) => {
        if (!favourites) return;
        playAlbum(favourites, index);
        if (authUser) {
            musicPlayed(songId);
        }
    }


    return (
        <div className="px-6">
            <h2 className="text-2xl font-[Roboto] font-semibold mb-4">Favourites</h2>
            <div className="max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-400 scrollbar-corner-transparent">
                {isLoading && <SongListSkeleton />}
                {!authUser && !isLoading && <div className='w-full h-[172px] flex flex-col justify-center items-center'>
                    <p className='font-[Roboto]'>Login to start getting recommended songs</p>
                    <Button onClick={() => setLoginPromptVisible(true)} className='bg-transparent transition duration-200 border hover:bg-[#572d7c]'>Login</Button>
                </div>}

                {authUser && !isLoading && favourites.length === 0 && <div className='w-full h-[172px]  grid place-items-center'>
                    <p className='font-[Roboto]'>Your favourite songs appear here</p>
                </div>}

                {
                    authUser && !isLoading && favourites.length !== 0 &&
                    favourites?.map((song, index) => {
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

                        return (<div key={song._id}>
                            <div onClick={() => handlePlaySong(index, song._id)} className={`grid grid-cols-[50px_2fr_2fr_1fr] px-4 items-center rounded-md hover:bg-[#492668] ${isCurrentPlayingSong ? "text-rose-500" : "text-[#f2e6ff]"} font-[Poppins] mx-4 transition duration-200 cursor-pointer`}>
                                {isCurrentPlayingSong ? <img src={isPlaying ? "/gif/sound wave.gif" : "/wave paused.png"} alt="wave" className='invert mix-blend-screen' /> : <p className="mx-auto text-xs">{index + 1}</p>}
                                <div className='flex font-[Roboto] gap-2 px-3 py-1 '>
                                    <div>
                                        <img className='size-12 rounded-md' src={song.imageUrl} alt="album thumbnail" />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <p>{song.title}</p>
                                        <p className='text-sm text-[#BC87FA]'>{song.artist}</p>
                                    </div>
                                </div>
                                <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{formatTime(song.duration)}</p>
                                <Heart className="text-white" onClick={handleFavouriteChange} fill={isFavourite ? "white" : "none"} size={20} />
                            </div>
                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default FavouriteSection