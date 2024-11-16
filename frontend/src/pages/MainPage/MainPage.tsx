import { ScrollArea } from "@/components/ui/scroll-area"
import TopBar from "./TopBar"
import { UseMusicStore } from "@/zustand/MusicStore"
import { useEffect, useState } from "react"
import { UseAuthStore } from "@/zustand/AuthStore"
import FeaturedSection from "./FeaturedSection"
import RecommendedSection from "./RecommendedSection"
import FavouriteSection from "./FavouriteSection"

const MainPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { featured, favourites, recommended, fetchFeatured, fetchRecommended, fetchFavourites } = UseMusicStore();
  const { authUser } = UseAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchFeatured();
      if (authUser) {
        await Promise.all([fetchFavourites(), fetchRecommended()]);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [authUser])


  return (
    <div className='mt-3 h-[calc(100vh-150px)] flex flex-col rounded-md bg-[#3B1E54] overflow-hidden'>
      <TopBar />
      <ScrollArea className="flex-1 bg-gradient-to-b to-[#3B1E54] via-[#3B1E54] from-[#4e2870]">

        <FeaturedSection featured={featured} isLoading={isLoading} />

        <RecommendedSection recommended={recommended} isLoading={isLoading} />

        <FavouriteSection favourites={favourites} isLoading={isLoading} />

        {/* <div className="px-6">
          <h2 className="text-2xl font-[Roboto] font-semibold ">Recommended</h2>
          <div className="flex gap-3 my-3">
            {isLoading && <SongCardBigSkeletons />}
            {!authUser && !isLoading && "Login"}

            {authUser && !isLoading && recommended.length === 0 && "empty"}

            {
              authUser && !isLoading && recommended.length !== 0 &&
              recommended?.map(song => (
                <SongCardBig key={song._id} title={song.title} artist={song.artist} imageUrl={song.imageUrl} />
              ))
            }
          </div>
        </div> */}

        {/* <div className="px-6">
          <h2 className="text-2xl font-[Roboto] font-semibold mb-4">Favourites</h2>
          <div className="max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-400 scrollbar-corner-transparent">
            {isLoading && <SongListSkeleton />}
            {!authUser && !isLoading && "Login"}

            {authUser && !isLoading && favourites.length === 0 && "empty"}

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
        </div> */}

      </ScrollArea>
    </div>
  )
}

export default MainPage