
const SongCardSkeletons = () => {
    return (
        Array.from({ length: 6 }).map((_, index) =>
            <div key={index} className="flex gap-2 items-center rounded-md h-16 flex-1">
                <div className='rounded-md h-16 aspect-square animate-pulse bg-[#190d24]' />
                <div className='w-full flex flex-col gap-2'>
                    <div className='h-6 rounded-md animate-pulse bg-[#190d24] w-[80%]' />
                    <div className='h-4 rounded-md animate-pulse bg-[#190d24] w-[30%]' />
                </div>
            </div>
        ))
}

export default SongCardSkeletons