import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { toast } from 'react-toastify';
import { create } from 'zustand';

type addSongParams = {
    title: string;
    artist: string;
    duration: number;
    albumId: string;
    image: File;
    audio: File;
}
type editSongParams = {
    songId: string;
    title: string;
    artist: string;
    duration: number;
    albumId: string | null;
    image: File | null;
    audio: File | null;
}

type createAlbumParams = {
    title: string;
    artist: string;
    image: File;
}

type editAlbumParams = {
    title: string;
    artist: string;
    image: File | null;
    albumId: string;
}

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
    fetchAllSongs: () => Promise<boolean>;
    addSong: ({ title, artist, duration, albumId, image, audio }: addSongParams) => Promise<boolean>;
    editSong: ({ title, artist, duration, albumId, image, audio, songId }: editSongParams) => Promise<boolean>;
    createAlbum: ({ title, artist, image }: createAlbumParams) => Promise<boolean>;
    editAlbum: ({ title, artist, image }: editAlbumParams) => Promise<boolean>;
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

    fetchAllSongs: async () => {
        try {
            const response = await axiosInstance.get("/song");

            if (!response.data.success)
                return false;

            set({ songs: response.data.result.songs });
            return true;
        } catch (error) {
            return false;
        }
    },

    addSong: async ({ title, artist, duration, albumId, image, audio }) => {
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("duration", duration.toString());
            formData.append("albumId", albumId);
            formData.append("imageFile", image);
            formData.append("audioFile", audio);

            const response = await axiosInstance.post("/admin/addSong", formData);

            if (!response || !response.data) {
                toast.error("Something went wrong");
                return false;
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
            }


            toast.success("Song Added");
            return true;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        }
    },
    editSong: async ({ title, artist, duration, albumId, image, audio, songId }) => {
        try {

            let formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("duration", duration.toString());
            formData.append("albumId", albumId || "");
            if (image)
                formData.append("imageFile", image);
            if (audio)
                formData.append("audioFile", audio);

            const response = await axiosInstance.post(`/admin/editSong/${songId}`, formData);

            if (!response || !response.data) {
                toast.error("Something went wrong");
                return false;
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
            }


            toast.success("Song Edited");
            return true;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        }
    },

    createAlbum: async ({ title, artist, image }) => {
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("imageFile", image);

            const response = await axiosInstance.post("/admin/createAlbum", formData);

            if (!response || !response.data) {
                toast.error("Something went wrong");
                return false;
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
            }

            toast.success("Album Created");
            return true;

        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        }
    },

    editAlbum: async ({ title, artist, image, albumId }) => {
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            if (image)
                formData.append("imageFile", image);

            const response = await axiosInstance.post(`/admin/editAlbum/${albumId}`, formData);

            if (!response || !response.data) {
                toast.error("Something went wrong");
                return false;
            }

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
            }

            toast.success("Album Edited");
            return true;

        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        }
    }
}));