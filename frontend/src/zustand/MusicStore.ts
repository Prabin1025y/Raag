import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: Boolean;
    currentAlbum: Album | null;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
}

export const UseMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    currentAlbum: null,

    fetchAlbums: async () => {
        set({ isLoading: true });

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
        } finally {
            set({ isLoading: false });
        }
    },
    fetchAlbumById: async (albumId: string) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/album/${albumId}`);

            if (!response.data.success)
                throw new Error(response.data.message);

            set({ currentAlbum: response.data.result.album });
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            set({ isLoading: false })
        }
    }
}));