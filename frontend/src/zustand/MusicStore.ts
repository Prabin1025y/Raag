import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    currentAlbum: Album | null;
    favourites: Song[];
    recommended: Song[];
    featured: Song[];

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchFavourites: () => Promise<boolean>;
    fetchRecommended: () => Promise<boolean>;
    fetchFeatured: () => Promise<boolean>;
}

export const UseMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    currentAlbum: null,
    favourites: [],
    recommended: [],
    featured: [],

    fetchAlbums: async () => {

        try {
            const response = await axiosInstance.get("/album");

            if (!response.data.success)
                throw new Error(response.data.message);

            // console.log(response.data.result.albums);


            set({ albums: response.data.result.albums });
            // console.log(albums);

        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    },
    fetchAlbumById: async (albumId: string) => {
        try {
            const response = await axiosInstance.get(`/album/${albumId}`);

            if (!response.data.success)
                throw new Error(response.data.message);

            set({ currentAlbum: response.data.result.album });
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    },

    fetchFavourites: async () => {
        try {
            const response = await axiosInstance.get("/song/favourite");

            if (!response.data.success)
                return false;

            console.log(response.data);
            

            set({ favourites: response.data.result.favouriteSongs });

            return true;


        } catch (error) {
            console.log(error);

            return false;
        }
    },

    fetchRecommended: async () => {
        try {
            const response = await axiosInstance.get("/song/recomended");

            if (!response.data.success)
                return false;


            if (response.data.result.recommendedSongs)
                set({ recommended: response.data.result.recommendedSongs });

            return true;
        } catch (error) {
            return false;
        }
    },

    fetchFeatured: async () => {
        try {
            const response = await axiosInstance.get("/song/featured");

            if (!response.data.success)
                return false;

            set({ featured: response.data.result.featuredSongs });
            return true;
        } catch (error) {
            return false;
        }
    },
}));