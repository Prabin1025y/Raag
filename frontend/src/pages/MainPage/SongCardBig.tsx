type ArgsTypes = {
    title: string;
    artist: string;
    imageUrl: string;
}

const SongCardBig = ({ title, artist, imageUrl }: ArgsTypes) => {
    return (
        <div className='hover:bg-[#5a2f7e] bg-[#4b266b] flex-1 rounded-2xl p-4 gap-2 flex flex-col font-[Roboto] transition duration-200 cursor-pointer'>
            <img src={imageUrl} alt="song" className='w-[full] rounded-lg' />
            <p className='font-medium'>{title}</p>
            <p className='text-[#d19dff]'>{artist}</p>
        </div>
    )
}

export default SongCardBig