import { CloudUpload, Loader2, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UseMusicStore } from '@/zustand/MusicStore'


const AddAlbum = () => {
    const [albumData, setAlbumData] = useState({ title: "", artist: "" });
    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { createAlbum, fetchAlbums } = UseMusicStore();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setAlbumData({ ...albumData, [event.target.name]: event.target.value })

    const handleCreateAlbum = async () => {
        setIsLoading(true);
        const { title, artist } = albumData;
        if (image) {
            const success = await createAlbum({ title, artist, image });
            if (success) {
                setAlbumData({ title: "", artist: "" });
                setShowPrompt(false);
                await fetchAlbums();
            }
        }
        setIsLoading(false);
    }

    return (
        <div>
            <div className='w-full flex justify-end '><Button onClick={() => setShowPrompt(true)} className='m-3 md:mx-0 md:mt-0 bg-green-600 hover:bg-green-800 mb-2'><Plus />Add Album</Button></div>
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 absolute top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                    <h2 className='text-3xl font-medium font-[Roboto]'>Create Album</h2>
                    <Label htmlFor="image">Album Thumbnail</Label>
                    <div onClick={() => imageInputRef.current?.click()} className='h-24 border grid place-items-center cursor-pointer rounded-lg border-dashed'>
                        {image ?
                            <img src={URL.createObjectURL(image)} alt="song image" className='max-h-20' />
                            : <div className='flex flex-col items-center'>
                                <CloudUpload />
                                <p>upload a photo</p>
                            </div>}
                        <input onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }} ref={imageInputRef} name='image' type='file' accept='image/*' className='hidden' />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="title">Album Name</Label>
                        <Input onChange={onChangeHandler} value={albumData.title} disabled={isLoading} name='title' type="text" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="artist">Artist</Label>
                        <Input onChange={onChangeHandler} value={albumData.artist} disabled={isLoading} name='artist' type="text" required />
                    </div>
                    <div className='flex gap-3 w-full justify-end'>
                        <Button onClick={() => setShowPrompt(false)} disabled={isLoading} className='bg-white text-black hover:bg-gray-300 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Cancel"}</Button>
                        <Button onClick={handleCreateAlbum} disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Add"}</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default AddAlbum