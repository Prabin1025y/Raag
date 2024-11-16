import { Button } from "@/components/ui/button"
import SongListSkeleton from "@/skeletons/SongListSkeleton"
import { Song } from "@/types"
import formatTime from "@/utils/formatTime"
import { UseAuthStore } from "@/zustand/AuthStore"
import { UseLoginStore } from "@/zustand/LoginStore"
import { Clock, Heart } from "lucide-react"

type Args = {
    favourites: Song[];
    isLoading: boolean;
}

const FavouriteSection = ({ favourites, isLoading }: Args) => {
    const { authUser } = UseAuthStore();
    const { setLoginPromptVisible } = UseLoginStore();
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
                    favourites?.map((song, index) =>
                        <div key={song._id}>
                            <div className="grid grid-cols-[50px_2fr_2fr_1fr] px-4 items-center rounded-md hover:bg-[#492668] text-[#f2e6ff] font-[Poppins] mx-4 transition duration-200 cursor-pointer">
                                <p className="mx-auto text-xs">{index + 1}</p>
                                <div className='flex font-[Roboto] gap-2 px-3 py-1 '>
                                    <div>
                                        <img className='size-12 rounded-md' src="/123.jpg" alt="album thumbnail" />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <p>{song.title}</p>
                                        <p className='text-sm text-[#BC87FA]'>{song.artist}</p>
                                    </div>
                                </div>
                                <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{formatTime(song.duration)}</p>
                                <Heart size={20} />
                            </div>
                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                        </div>)
                }
            </div>
        </div>
    )
}

export default FavouriteSection