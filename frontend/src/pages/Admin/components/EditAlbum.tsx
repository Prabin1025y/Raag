import { Edit2, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UseMusicStore } from '@/zustand/MusicStore'
import { Album } from '@/types'


const EditAlbum = ({ album }: { album: Album }) => {
    const [albumData, setAlbumData] = useState({ title: album.title, artist: album.artist });
    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { editAlbum } = UseMusicStore();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setAlbumData({ ...albumData, [event.target.name]: event.target.value })

    const handleEditAlbum = async () => {
        setIsLoading(true);
        const { title, artist } = albumData;
        const success = await editAlbum({ title, artist, image, albumId: album._id });
        setIsLoading(false);
        if (success) {
            setShowPrompt(false);
            setAlbumData({ title: album.title, artist: album.artist });
        }
    }

    return (
        <div>
            <Edit2 onClick={() => setShowPrompt(true)} className='cursor-pointer' size={20} />
            {showPrompt && <div className='animate-in z-50 duration-500 fade-in-0 fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center'>
                <div className=' animate-in slide-in-from-bottom-6 duration-500 relative w-[400px] bg-[#160b1f] h-fit border rounded-2xl p-6 flex flex-col gap-4'>
                    <h2 className='text-3xl font-medium font-[Roboto]'>Create Album</h2>
                    <Label htmlFor="image">Album Thumbnail</Label>
                    <div onClick={() => imageInputRef.current?.click()} className='h-24 border grid place-items-center cursor-pointer rounded-lg border-dashed'>
                        {image ?
                            <img src={URL.createObjectURL(image)} alt="song image" className='max-h-20' />
                            : <img src={album.imageUrl} alt="song image" className='max-h-20' />}
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
                        <Button onClick={handleEditAlbum} disabled={isLoading} className='bg-violet-700 hover:bg-violet-800 transition duration-200'>{isLoading ? <Loader2 className='animate-spin' /> : "Edit"}</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default EditAlbum