import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import MainPage from "./pages/MainPage/MainPage";
import PageLayout from "./pages/Layout/PageLayout";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import { UseAuthStore } from "./zustand/AuthStore";
import { useEffect } from "react";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";

export default function App() {

  const { checkAuth, checkIsAdmin, authUser, isAdmin } = UseAuthStore();

  useEffect(() => {
    checkAuth();
    if (authUser)
      checkIsAdmin(authUser._id);
  }, [checkAuth])



  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PageLayout />} >
          <Route path="/" element={<MainPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Route>
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </>
  );
}