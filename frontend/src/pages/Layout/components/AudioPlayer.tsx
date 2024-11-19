import { useAudioStore } from '@/zustand/AudioStore';
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongUrlRef = useRef<string | null>(null);

    const { isPlaying, currentSong, playNext } = useAudioStore();

    //Play or pause the song as per value of isPlaying
    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying)
            audio?.play();
        else
            audio?.pause();
    }, [isPlaying])

    //change to another song if current song ended
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        }

        audio?.addEventListener("ended", handleEnded)

        return () => { audio?.removeEventListener("ended", handleEnded) }
    }, [])

    useEffect(() => {
        if (!audioRef.current || !currentSong) return

        const audio = audioRef.current;

        if (currentSong?.audioUrl !== prevSongUrlRef.current) {
            audio.src = currentSong.audioUrl
            audio.currentTime = 0;
            prevSongUrlRef.current = currentSong.audioUrl
            if (isPlaying) audio.play()
        }
    }, [currentSong, isPlaying])


    return (
        <audio ref={audioRef} />
    )
}

export default AudioPlayer