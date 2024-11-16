import SongCardBigSkeletons from '@/skeletons/SongCardBigSkeletons'
import { Song } from '@/types';
import { UseAuthStore } from '@/zustand/AuthStore'
import SongCardBig from './SongCardBig';
import { Button } from '@/components/ui/button';
import { UseLoginStore } from '@/zustand/LoginStore';

type Args = {
    recommended: Song[];
    isLoading: boolean;
}

const RecommendedSection = ({ isLoading, recommended }: Args) => {
    const { authUser } = UseAuthStore();
    const { setLoginPromptVisible } = UseLoginStore();
    return (
        <div className="px-6">
            <h2 className="text-2xl font-[Roboto] font-semibold ">Recommended</h2>
            <div className="flex gap-3 my-3">
                {isLoading && <SongCardBigSkeletons />}
                {!authUser && !isLoading && <div className='w-full h-[172px] flex flex-col justify-center items-center'>
                    <p className='font-[Roboto]'>Login to start getting recommended songs</p>
                    <Button onClick={() => setLoginPromptVisible(true)} className='bg-transparent transition duration-200 border hover:bg-[#572d7c]'>Login</Button>
                </div>}

                {authUser && !isLoading && recommended.length === 0 && <div className='w-full h-[172px]  grid place-items-center'>
                    <p className='font-[Roboto]'>Songs will be recommended after you've listened to some songs</p>
                </div>}

                {
                    authUser && !isLoading && recommended.length !== 0 &&
                    recommended?.map(song => (
                        <SongCardBig key={song._id} title={song.title} artist={song.artist} imageUrl={song.imageUrl} />
                    ))
                }
            </div>
        </div>
    )
}

export default RecommendedSection