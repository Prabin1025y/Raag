import { Compass, DiscAlbum, House } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import AlbumSkeleton from '@/skeletons/AlbumSkeleton'
import { UseMusicStore } from '@/zustand/MusicStore'
import { useEffect, useState } from 'react'

const LeftSidebar = () => {
    const { albums, fetchAlbums } = UseMusicStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchAlbums().then(()=>setIsLoading(false));

    }, [fetchAlbums])

    return (
        <div className="flex flex-col gap-3 h-[calc(100vh-120px)] mt-3 ml-3">
            <div className="rounded-md bg-[#3B1E54] h-36 p-3 flex flex-col justify-between">
                <Link to="/" className="text-3xl font-[Pacifico] px-3">Raag</Link>
                <Link to="/" className="flex group gap-3 transition relative duration-200 hover:bg-[#462464] rounded-md px-3 py-2 mt-2">
                    <div className="h-10 w-1 group-hover:scale-y-100 scale-y-0 transition duration-200 rounded-md bg-white/80 absolute left-0 top-0 " />
                    <House className='size-5 lg:size-6' />
                    <p className="font-bold text-sm lg:text-base font-[Roboto]">Home</p>
                </Link>
                <Link to="/discover" className="flex group relative gap-3 transition duration-200 hover:bg-[#462464] rounded-md px-3 py-2">
                    <div className="h-10 w-1 group-hover:scale-y-100 scale-y-0 transition duration-200 rounded-md bg-white/80 absolute left-0 top-0 " />
                    <Compass className='size-5 min-w-5 lg:size-6' />
                    <p className="font-bold text-sm lg:text-base font-[Roboto]">Discover</p>
                </Link>
            </div>
            <div className="rounded-md bg-[#3B1E54] flex-1 flex flex-col overflow-hidden">
                <div className="h-16  flex items-center gap-2 lg:gap-3 px-6 py-2">
                    <DiscAlbum className='size-5 lg:size-6' />
                    <p className="font-bold text-sm lg:text-base font-[Roboto]">Albums</p>
                </div>
                <ScrollArea className='flex-1 bg-[#281538] py-2'>
                    {isLoading
                        ? <   AlbumSkeleton />
                        : (
                            albums.map(album => (
                                <Link key={album._id} to={`/album/${album._id}`} className='flex font-[Roboto] gap-2 px-3 py-1 rounded-md transition duration-200 hover:bg-[#361c4b]'>
                                    <div>
                                        <img className='size-8 min-w-8 lg:size-16 lg:min-w-16 rounded-md' src={album.imageUrl} alt="album thumbnail" />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <p className='text-sm lg:text-base'>{album.title}</p>
                                        <p className='text-xs lg:text-sm text-[#e4c3ff]'>{album.artist}</p>
                                    </div>
                                </Link>
                            ))
                        )

                    }
                </ScrollArea>
                <div className="h-16"></div>
            </div>
        </div>
    )
}

export default LeftSidebar