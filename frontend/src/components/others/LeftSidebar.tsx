import { Compass, DiscAlbum, House } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import AlbumSkeleton from '@/skeletons/AlbumSkeleton'
import { UseMusicStore } from '@/zustand/MusicStore'
import { useEffect } from 'react'

const LeftSidebar = () => {
    const { isLoading, albums, fetchAlbums } = UseMusicStore();

    useEffect(() => {
        fetchAlbums();

    }, [fetchAlbums])

    return (
        <div className="flex flex-col gap-3 h-[calc(100vh-150px)] mt-3 ml-3">
            <div className="rounded-md bg-[#3B1E54] h-[21%] p-3 flex flex-col justify-between">
                <Link to="/" className="text-3xl font-[Pacifico] px-3">Raag</Link>
                <Link to="/" className="flex group gap-3 transition relative duration-200 hover:bg-[#462464] rounded-md px-3 py-2 mt-2">
                    <div className="h-10 w-1 group-hover:scale-y-100 scale-y-0 transition duration-200 rounded-md bg-white/80 absolute left-0 top-0 " />
                    <House />
                    <p className="font-bold font-[Roboto]">Home</p>
                </Link>
                <Link to="/" className="flex group relative gap-3 transition duration-200 hover:bg-[#462464] rounded-md px-3 py-2">
                    <div className="h-10 w-1 group-hover:scale-y-100 scale-y-0 transition duration-200 rounded-md bg-white/80 absolute left-0 top-0 " />
                    <Compass />
                    <p className="font-bold font-[Roboto]">Discover</p>
                </Link>
            </div>
            <div className="rounded-md bg-[#3B1E54] h-[79%] flex flex-col overflow-hidden">
                <div className="h-16  flex items-center gap-3 px-3 py-2">
                    <DiscAlbum />
                    <p className="font-bold font-[Roboto]">Albums</p>
                </div>
                <ScrollArea className='flex-1 bg-[#281538] py-2'>
                    {isLoading
                        ? <   AlbumSkeleton />
                        : (
                            albums.map(album => (
                                <Link key={album._id} to={`/album/${album._id}`} className='flex font-[Roboto] gap-2 px-3 py-1 rounded-md transition duration-200 hover:bg-[#361c4b]'>
                                    <div>
                                        <img className='size-16 min-w-16 rounded-md' src="/123.jpg" alt="album thumbnail" />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <p>{album.title}</p>
                                        <p className='text-sm text-[#e4c3ff]'>{album.artist}</p>
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