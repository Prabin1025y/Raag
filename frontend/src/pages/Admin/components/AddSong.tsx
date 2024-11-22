import { CloudUpload, Loader2, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseMusicStore } from '@/zustand/MusicStore'


const AddSong = () => {
    const [songData, setSongData] = useState({ title: "", artist: "", duration: 0, albumId: "" });
    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    const { albums, addSong } = UseMusicStore();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSongData({ ...songData, [event.target.name]: event.target.value })

    const handleSongAdd = async () => {
        setIsLoading(true);
        const { title, artist, duration, albumId } = songData;
        if (image && audio) {
            const success = await addSong({ title, artist, duration, albumId, image, audio });
            if (success) {
                setSongData({ title: "", artist: "", duration: 0, albumId: "" });
                setShowPrompt(false);
            }
        }
        setIsLoading(false);
    }

    return (
        <div>
            <div className='w-full flex justify-end'><Button onClick={() => setShowPrompt(true)} className='bg-green-600 hover:bg-green-800 mb-2'><Plus />Add Song</Button></div>
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                    <h2 className='text-3xl font-medium font-[Roboto]'>Add Song</h2>
                    <Label htmlFor="image">Song Thumbnail</Label>
                    <div onClick={() => imageInputRef.current?.click()} className='h-24 border grid place-items-center cursor-pointer rounded-lg border-dashed'>
                        {image ?
                            <img src={URL.createObjectURL(image)} alt="song image" className='max-h-20' />
                            : <div className='flex flex-col items-center'>
                                <CloudUpload />
                                <p>upload a photo</p>
                            </div>}
                        <input onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }} ref={imageInputRef} name='image' type='file' accept='image/*' className='hidden' />
                    </div>
                    <Label htmlFor="audio">Audio</Label>
                    <div className='h-10 border grid place-items-center cursor-pointer rounded-lg'>
                        <input onChange={(e) => { if (e.target.files) setAudio(e.target.files[0]) }} ref={audioInputRef} name='ausio' type='file' accept='audio/*' className='' />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="currentPassword">Song Title</Label>
                        <Input onChange={onChangeHandler} value={songData.title} disabled={isLoading} name='title' type="text" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="newPassword">Artist</Label>
                        <Input onChange={onChangeHandler} value={songData.artist} disabled={isLoading} name='artist' type="text" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Duration(Seconds)</Label>
                        <Input onChange={onChangeHandler} value={songData.duration} disabled={isLoading} name='duration' type="number" required />
                    </div>
                    <Label htmlFor="albumId">Album(Optional)</Label>
                    <Select name='albumId' defaultValue='none' onValueChange={(value) => setSongData({ ...songData, albumId: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Albums" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {
                                albums.map(album => (
                                    <SelectItem key={album._id} value={album._id} >{album.title}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <div className='flex gap-3 w-full justify-end'>
                        <Button onClick={() => setShowPrompt(false)} disabled={isLoading} className='bg-white text-black hover:bg-gray-300 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Cancel"}</Button>
                        <Button onClick={handleSongAdd} disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Add"}</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default AddSong