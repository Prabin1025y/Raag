import SongCardSkeletons from '@/skeletons/SongCardSkeletons'
import React from 'react'
import SongCard from './SongCard'
import { Song } from '@/types'

type Args = {
    featured: Song[];
    isLoading: boolean;
}

const FeaturedSection = ({ featured, isLoading }: Args) => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-[Roboto] font-semibold ">Featured Songs</h2>
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 my-3">
                {isLoading ? <SongCardSkeletons /> :
                    featured.map((song) => (
                        <SongCard key={song._id} title={song.title} artist={song.artist} imageUrl={song.imageUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default FeaturedSection