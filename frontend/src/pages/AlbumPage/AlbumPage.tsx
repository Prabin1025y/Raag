import { UseMusicStore } from "@/zustand/MusicStore"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
    const { albumId } = useParams();
    const { currentAlbum, isLoading, fetchAlbumById } = UseMusicStore();

    useEffect(() => {
        albumId && fetchAlbumById(albumId);
    }, [fetchAlbumById, albumId])

    return (
        <div className="mt-3 h-[calc(100vh-150px)] rounded-md bg-[#3B1E54]">
            {
                isLoading ? "Loading..." :
                    <p>Album</p>
            }
        </div>
    )
}

export default AlbumPage