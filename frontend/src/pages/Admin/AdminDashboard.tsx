import { AudioLines, DiscAlbum, Edit2, Music, Plus, Trash2, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from '@/components/ui/scroll-area'
import { UseMusicStore } from '@/zustand/MusicStore'
import { useEffect, useState } from 'react'
import SongListSkeleton from '@/skeletons/SongListSkeleton'
import { UseAuthStore } from '@/zustand/AuthStore'
import { Link } from 'react-router-dom'
import AddSong from './components/AddSong'
import AddAlbum from './components/AddAlbum'
import EditSong from './components/EditSong'
import EditAlbum from './components/EditAlbum'


const AdminDashboard = () => {
    const { authUser, fetchUsers, users } = UseAuthStore();
    const { fetchAllSongs, songs, fetchAlbums, albums, deleteAlbum, deleteSong } = UseMusicStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stats, setStats] = useState<{ users: number, songs: number, albums: number, songCount: number }>({ users: 0, songs: 0, albums: 0, songCount: 0 })


    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            await fetchAllSongs();
            await fetchAlbums();
            await fetchUsers();
            setStats({ ...stats, songs: songs.length, albums: albums.length, users: users.length })
            setIsLoading(false);
        }

        fetchData();
    }, [songs.length, albums.length, users.length])

    return (
        <div className='bg-[#281538] h-screen w-screen p-3'>
            <div className='w-full size-full rounded-md bg-gradient-to-b from-[#63368A] to-[#3B1E54]'>

                {/* topbar */}
                <div className='flex justify-between h-20 bg-[#3B1E54] py-3 px-5'>
                    <Link to="/"><img src="/raag logo.png" alt="logo" className='h-full' /></Link>
                    <img src={authUser?.imageUrl} alt="avatar" className='rounded-full' />
                </div>

                {/* stats */}
                <div className='mx-auto pt-24 text-white grid grid-cols-[1fr_1fr_1fr_1fr] px-[20vw]  gap-6'>
                    <div className='bg-[#3B1E54] flex p-8 justify-center items-center gap-3 rounded-lg'>
                        <Music size={50} className=' text-[#e68a35] bg-[#e68b3546] p-3 rounded-lg ' />
                        <div className='flex flex-col items-center'>
                            <p className='font-semibold'>Total Songs</p>
                            <p>{stats.songs}</p>
                        </div>
                    </div>
                    <div className='bg-[#3B1E54] flex p-8 justify-center items-center gap-3 rounded-lg'>
                        <DiscAlbum size={50} className=' text-[#2dc8ce] bg-[#2dc8ce46] p-3 rounded-lg ' />
                        <div className='flex flex-col items-center'>
                            <p className='font-semibold'>Total Albums</p>
                            <p>{stats.albums}</p>
                        </div>
                    </div>
                    <div className='bg-[#3B1E54] flex p-8 justify-center items-center gap-3 rounded-lg'>
                        <Users size={50} className=' text-[#d735e6] bg-[#d735e646] p-3 rounded-lg ' />
                        <div className='flex flex-col items-center'>
                            <p className='font-semibold'>Total Users</p>
                            <p>{stats.users}</p>
                        </div>
                    </div>
                    <div className='bg-[#3B1E54] flex p-8 justify-center items-center gap-3 rounded-lg'>
                        <AudioLines size={50} className=' text-[#76e635] bg-[#76e63546] p-3 rounded-lg ' />
                        <div className='flex flex-col items-center'>
                            <p className='font-semibold'>Music Played</p>
                            <p>{stats.songCount}</p>
                        </div>
                    </div>
                    <Tabs defaultValue="songs" className=" col-span-4">
                        <TabsList className='bg-[#3B1E54]'>
                            <TabsTrigger className='text-white' value="songs">Songs</TabsTrigger>
                            <TabsTrigger className='text-white' value="albums">Albums</TabsTrigger>
                            <TabsTrigger className='text-white' value="users">Users</TabsTrigger>
                        </TabsList>
                        <TabsContent className='bg-[#3B1E54] w-full rounded-lg h-[55vh] p-4' value="songs">
                            {/* <div className='w-full flex justify-end'><Button className='bg-green-600 hover:bg-green-800 mb-2'><Plus />Add Song</Button></div> */}
                            <AddSong />
                            <ScrollArea className='h-full'>
                                {songs.map((song, index) => (
                                    isLoading ? <SongListSkeleton key={index} /> :
                                        <>
                                            <div key={song._id} className={`grid grid-cols-[50px_8fr_1fr] px-4 items-center rounded-md hover:bg-[#492668] text-[#f2e6ff] font-[Poppins] mx-4 transition duration-200`}>
                                                <p className="mx-auto text-xs">{index + 1}</p>
                                                <div className='flex font-[Roboto] gap-2 px-3 py-1 '>
                                                    <div>
                                                        <img className='size-12 rounded-md object-cover' src={song.imageUrl} alt="album thumbnail" />
                                                    </div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p>{song.title}</p>
                                                        <p className='text-sm text-[#BC87FA]'>{song.artist}</p>
                                                    </div>
                                                </div>
                                                {/* <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{0}</p> */}
                                                <div className='flex gap-10'>
                                                    {/* <Edit2 className='cursor-pointer' size={20} /> */}
                                                    <EditSong song={song} />
                                                    <Trash2 onClick={() => deleteSong(song._id)} className='cursor-pointer text-red-500' size={20} />
                                                </div>
                                            </div>
                                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                                        </>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent className=' bg-[#3B1E54] w-full rounded-lg h-[55vh] p-4' value="albums">
                            <AddAlbum />
                            <ScrollArea className='h-full'>
                                {albums.map((album, index) => (
                                    isLoading ? <SongListSkeleton key={index} /> :
                                        <>
                                            <div key={album._id} className={`grid grid-cols-[50px_8fr_1fr] px-4 items-center rounded-md hover:bg-[#492668] text-[#f2e6ff] font-[Poppins] mx-4 transition duration-200`}>
                                                <p className="mx-auto text-xs">{index + 1}</p>
                                                <div className='flex font-[Roboto] gap-2 px-3 py-1 '>
                                                    <div>
                                                        <img className='size-12 rounded-md' src={album.imageUrl} alt="album thumbnail" />
                                                    </div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p>{album.title}</p>
                                                        <p className='text-sm text-[#BC87FA]'>{album.artist}</p>
                                                    </div>
                                                </div>
                                                {/* <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{0}</p> */}
                                                <div className='flex gap-10'>
                                                    {/* <Edit2 className='cursor-pointer' size={20} /> */}
                                                    <EditAlbum album={album} />
                                                    <Trash2 onClick={() => deleteAlbum(album._id)} className='cursor-pointer text-red-500' size={20} />
                                                </div>
                                            </div>
                                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                                        </>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent className='bg-[#3B1E54] w-full rounded-lg h-[55vh] p-4' value="users">
                            <ScrollArea className='h-full'>
                                {users.map((user, index) => (
                                    isLoading ? <SongListSkeleton key={index} /> :
                                        <>
                                            <div key={user._id} className={`grid grid-cols-[50px_8fr_1fr] px-4 items-center rounded-md hover:bg-[#492668] text-[#f2e6ff] font-[Poppins] mx-4 transition duration-200`}>
                                                <p className="mx-auto text-xs">{index + 1}</p>
                                                <div className='flex font-[Roboto] gap-2 px-3 py-1 '>
                                                    <div>
                                                        <img className='size-12 rounded-md' src={user.imageUrl} alt="album thumbnail" />
                                                    </div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p>{user.fullName}</p>
                                                        <p className='text-sm text-[#BC87FA]'>{user.email}</p>
                                                    </div>
                                                </div>
                                                {/* <p className="mx-auto text-xs flex gap-1 items-center"><Clock size={12} />{0}</p> */}
                                                <Trash2 className='cursor-pointer text-red-500' size={20} />
                                            </div>
                                            <hr className="mx-4 my-1 border-[#bd87fa1c]" />
                                        </>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>


            </div>
        </div>
    )
}

export default AdminDashboard