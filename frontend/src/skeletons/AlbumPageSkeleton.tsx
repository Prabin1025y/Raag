
const AlbumPageSkeleton = () => {
    return (
        <div className='h-full'>
            <div className="h-1/2 relative">
                <div className="z-10 flex gap-8 items-end relative left-[9%] top-[40%]">
                    <div className=" size-48 rounded-lg bg-[#170620] animate-pulse" />
                    <div className="flex flex-col gap-2 pb-6">
                        <div className="w-48 h-10 rounded-lg animate-pulse  bg-[#170620]" />
                        <div className="w-20 h-6  rounded-lg animate-pulse bg-[#170620]" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>

                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-[50px_2fr_2fr_1fr] px-4 items-center rounded-md mx-4">
                            <div className="mx-auto h-3 w-3 " />
                            <div className='flex gap-2 px-3 py-1 '>
                                <div>
                                    <div className='size-12 rounded-md animate-pulse bg-[#170620]' />
                                </div>
                                <div className='flex flex-col gap-2 justify-center'>
                                    <div className='w-96 rounded-lg h-6 animate-pulse bg-[#170620]' />
                                    <div className='w-16 rounded-lg h-4 animate-pulse bg-[#170620]' />
                                </div>
                            </div>
                            <div className='w-12 h-4' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AlbumPageSkeleton