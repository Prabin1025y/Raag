import SongCardSkeletons from '@/skeletons/SongCardSkeletons'
import SongCard from './SongCard'
import { Song } from '@/types'

type Args = {
    featured: Song[];
    isLoading: boolean;
}

const FeaturedSection = ({ featured, isLoading }: Args) => {

    return (
        <div className="p-3 lg:p-6">
            <h2 className="text-xl lg:text-3xl font-[Roboto] font-semibold ">Featured Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]  md:gap-3 my-3">
                {isLoading ? <SongCardSkeletons /> :
                    featured.map((song, index) => (
                        <SongCard key={song._id} id={song._id} index={index} title={song.title} artist={song.artist} imageUrl={song.imageUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default FeaturedSection