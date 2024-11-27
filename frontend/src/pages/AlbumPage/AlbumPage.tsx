import { UseMusicStore } from "@/zustand/MusicStore"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongContainer from "./SongContainer";
import AlbumHeader from "./AlbumHeader";
import AlbumPageSkeleton from "@/skeletons/AlbumPageSkeleton";

const AlbumPage = () => {
    const { albumId } = useParams();
    const { currentAlbum, fetchAlbumById } = UseMusicStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        albumId && fetchAlbumById(albumId).then(() => setIsLoading(false));
    }, [fetchAlbumById, albumId])

    return (
        <div className="mt-3 h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] rounded-md bg-[#3B1E54]">
            {
                isLoading ? <AlbumPageSkeleton /> :

                    <div className="h-full">
                        <AlbumHeader currentAlbum={currentAlbum} />
                        <SongContainer currentAlbum={currentAlbum} />
                    </div>
            }
        </div>
    )
}

export default AlbumPage