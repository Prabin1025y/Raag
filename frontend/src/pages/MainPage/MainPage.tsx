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

  const { featured, favourites, fetchFeatured, fetchRecommended, fetchFavourites } = UseMusicStore();
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
    <div className='mt-3 h-[calc(100vh-120px)] flex flex-col rounded-md bg-[#3B1E54] overflow-hidden'>
      <TopBar />
      <ScrollArea className="flex-1 bg-gradient-to-b to-[#3B1E54] via-[#3B1E54] from-[#4e2870]">

        <FeaturedSection featured={featured} isLoading={isLoading} />

        <RecommendedSection isLoading={isLoading} />

        <FavouriteSection favourites={favourites} isLoading={isLoading} />


      </ScrollArea>
    </div>
  )
}

export default MainPage