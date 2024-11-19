import { Song } from '@/types';
import { create } from 'zustand';

type AudioStore = {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    setCurrentSong: (song: Song | null) => void;
    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startingIndex: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    setCurrentSong: (song) => {
        if (!song) return;

        const songIndex = get().queue.findIndex(s => s._id === song._id);

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        })
    },
    initializeQueue: (songs) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },
    playAlbum: (songs, startingIndex) => {
        if (songs.length === 0) return;

        const song = songs[startingIndex];
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startingIndex,
            isPlaying: true
        })
    },
    togglePlay: () => {
        const newValue = !get().isPlaying;

        set({ isPlaying: newValue })
    },
    playNext: () => {

        const { currentIndex, queue } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentIndex: nextIndex,
                currentSong: nextSong,
                isPlaying: true
            })
        } else {
            set({ isPlaying: false })
        }
    },
    playPrevious: () => {
        const { currentIndex, queue } = get();
        const prevIndex = currentIndex - 1;

        if (prevIndex > -1) {
            const nextSong = queue[prevIndex];
            set({
                currentIndex: prevIndex,
                currentSong: nextSong,
                isPlaying: true
            })
        } else {
            set({ isPlaying: false })
        }
    }
}))