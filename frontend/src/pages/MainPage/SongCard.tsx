type ArgsTypes = {
    title: string;
    artist: string;
    imageUrl: string;
}

const SongCard = ({ title, artist, imageUrl }: ArgsTypes) => {
    return (
        <div className="flex gap-2 items-center rounded-md h-16 flex-1 hover:bg-[#6a3896] font-[Roboto] cursor-pointer transition duration-200">
            <img src="/123.jpg" alt="song" className='rounded-md h-16' />
            <div>
                <p>{title}</p>
                <p className='text-sm text-[#d19dff]'>{artist}</p>
            </div>
        </div>
    )
}

export default SongCard 