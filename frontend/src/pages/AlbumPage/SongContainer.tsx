import { Album } from '@/types';
import formatTime from '@/utils/formatTime';
import { Clock, Heart } from 'lucide-react';
import React from 'react'

type SongContainerProps = {
    currentAlbum: Album | null;
}

const SongContainer: React.FC<SongContainerProps> = ({ currentAlbum }) => {

    return (
        <div>
            {/* <div className="grid grid-cols-[50px_2fr_2fr_1fr] px-4 text-[#BC87FA] font-[Poppins]">
                <p className="mx-auto">S.N.</p>
                <p className="ml-2">Title</p>
                <p className="mx-auto">Artist</p>
                <p className="mx-auto">Duration</p>
            </div>
            <hr className="mx-4 my-1 border-[#BC87FA]" /> */}
            {
                currentAlbum?.songs.map((song, index) => (
                    <>
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
                    </>
                ))
            }


        </div>
    )
}

export default SongContainer