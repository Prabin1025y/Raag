import { Slider } from "@/components/ui/slider"
import formatTime from "@/utils/formatTime";
import { useAudioStore } from "@/zustand/AudioStore"
import { Pause, Play, StepBack, StepForward, Volume, Volume1 } from "lucide-react"
import { useEffect, useRef, useState } from "react";

const AudioControls = () => {
    const { togglePlay, playNext, playPrevious, isPlaying, currentSong } = useAudioStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(75);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleUpdateDuration = () => setDuration(audio.duration);
        const handleSongEnd = () => { useAudioStore.setState({ isPlaying: false }) };


        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleUpdateDuration)
        audio.addEventListener("ended", handleSongEnd);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleUpdateDuration)
            audio.removeEventListener("ended", handleSongEnd);
        }
    }, [currentSong])

    const handleSliderValueChange = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    }

    const handleVolumeChange = (value: number[]) => {
        if (!audioRef.current) return;

        setVolume(value[0]);
        audioRef.current.volume = value[0] / 100;
    }


    return (
        <footer className='bg-[#694099] flex-1 grid grid-cols-[1fr_5fr_1fr] items-center px-6 text-white'>
            <div className='flex font-[Roboto] gap-2 px-3 py-1 rounded-md transition duration-200'>
                <div>
                    <img className='size-16 shrink-0 aspect-square object-cover rounded-md' src={currentSong?.imageUrl} alt="album thumbnail" />
                </div>
                <div className='flex flex-col justify-center'>
                    <p>{currentSong?.title}</p>
                    <p className='text-sm text-[#e4c3ff]'>{currentSong?.artist}</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex gap-8 items-center">
                    <StepBack onClick={playPrevious} className="cursor-pointer" />
                    <div onClick={togglePlay} className="rounded-full p-2 grid place-items-center bg-white text-black cursor-pointer">{isPlaying ? <Pause /> : <Play />}</div>
                    <StepForward onClick={playNext} className="cursor-pointer" />
                </div>
                <div className="flex gap-2">
                    <p>{formatTime(currentTime)}</p>
                    <Slider onValueChange={handleSliderValueChange} defaultValue={[0]} max={duration} step={1} value={[currentTime]} className="hover:cursor-grab active:cursor-grabbing w-[50vw]" />
                    <p>{formatTime(duration)}</p>
                </div>
            </div>
            <div className="flex items-center">
                <Volume1 />
                <Slider defaultValue={[75]} max={100} value={[volume]} className="w-[80%]" onValueChange={handleVolumeChange} />
            </div>
        </footer>
    )
}

export default AudioControls