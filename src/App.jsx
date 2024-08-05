import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import NotFound from "./components/NotFound"; // Import the NotFound component

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import AdminRoute from "./components/AdminRoute";
import AdminNavBar from "./pages/Admin/components/AdminNavBar";
import UpdateMenu from "./pages/Admin/pages/UpdateMenu";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // List of all defined routes
  const routes = [
    "/",
    "/menu",
    "/sign-in",
    "/sign-up",
    "/admin",
    "/admin/update-menu",
  ];

  const isDefinedRoute = routes.includes(location.pathname);

  return (
    <>
      {isDefinedRoute && (isAdminRoute ? <AdminNavBar /> : <NavBar />)}

      <Routes>
        {isAdminRoute ? (
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="update-menu" element={<UpdateMenu />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {isDefinedRoute && !isAdminRoute && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
