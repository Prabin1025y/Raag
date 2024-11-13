import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Signup from "./pages/SignupPage/Signup";
import PageLayout from "./pages/Layout/PageLayout";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PageLayout />} >
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}