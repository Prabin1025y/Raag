
const SongCardBigSkeletons = () => {
    return (
        Array.from({ length: 6 }).map((_, index) =>
            <div key={index} className=' bg-[#4b266b] flex-1 rounded-2xl p-4 gap-2 flex flex-col '>
                <div className='w-[full] rounded-lg aspect-square animate-pulse bg-[#190d24]' />
                <div className='h-6 rounded-md animate-pulse bg-[#190d24] w-[80%]' />
                <div className='h-4 rounded-md animate-pulse bg-[#190d24] w-[30%]' />
            </div>
        ))
}

export default SongCardBigSkeletons