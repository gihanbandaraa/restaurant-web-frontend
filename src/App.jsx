import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import AdminRoute from "./components/AdminRoute";
import AdminNavBar from "./pages/Admin/components/AdminNavBar";
import AdminSideBar from "./pages/Admin/components/AdminSideBar";
import UpdateMenu from "./pages/Admin/sections/UpdateMenu";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavBar /> : <NavBar />}

      <Routes>
        {isAdminRoute ? (
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="update-menu" element={<UpdateMenu />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        )}
      </Routes>
      {isAdminRoute ? <AdminSideBar /> : <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
