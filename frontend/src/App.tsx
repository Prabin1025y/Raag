import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import MainPage from "./pages/MainPage/MainPage";
import PageLayout from "./pages/Layout/PageLayout";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import { UseAuthStore } from "./zustand/AuthStore";
import { useEffect } from "react";

export default function App() {

  const { checkAuth } = UseAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])


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