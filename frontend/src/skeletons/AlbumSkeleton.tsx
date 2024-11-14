
const AlbumSkeleton = () => {
    return Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='flex gap-2 p-3'>
            <div className='size-16 rounded-md animate-pulse bg-[#150b1d]' />
            <div className='flex-1 flex flex-col gap-2 pt-3'>
                <div className='rounded-sm h-3 w-2/3 animate-pulse bg-[#150b1d]' />
                <div className='rounded-sm h-3 w-1/3 animate-pulse bg-[#150b1d]' />
            </div>
        </div>
    ))

}

export default AlbumSkeleton