import TopBar from "./TopBar"

const MainPage = () => {

  return (
    <div className='mt-3 h-[calc(100vh-150px)] flex flex-col rounded-md bg-[#3B1E54] overflow-hidden'>
      <TopBar />
      <div className="flex-1 bg-gradient-to-b to-[#3B1E54] via-[#3B1E54] from-[#4e2870]">
        songs
      </div>
    </div>
  )
}

export default MainPage