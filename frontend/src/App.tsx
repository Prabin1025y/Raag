import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import MainPage from "./pages/MainPage/MainPage";
import PageLayout from "./pages/Layout/PageLayout";
import AlbumPage from "./pages/AlbumPage/AlbumPage";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PageLayout />} >
          <Route path="/" element={<MainPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
}