import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderConfirmation from "./components/OrderConfirmation";

import NotFound from "./components/NotFound"; // Import the NotFound component

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import AdminRoute from "./components/AdminRoute";
import AdminNavBar from "./pages/Admin/components/AdminNavBar";
import UpdateMenu from "./pages/Admin/pages/UpdateMenu";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCategories from "./pages/Admin/pages/AddCategories";
import UpdateGallery from "./pages/Admin/pages/UpdateGallery";
import ManageReservation from "./pages/Admin/pages/ManageReservation";
import ManageOffers from "./pages/Admin/pages/ManageOffers";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // List of all defined routes
  const routes = [
    "/",
    "/menu",
    "/menu/checkout",
    "/sign-in",
    "/sign-up",
    "/order-confirmation",
    "/admin",
    "/admin/update-menu",
    "/admin/add-categories",
    "/admin/gallery",
    "/admin/reservation",
    "/admin/offers",
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
            <Route path="add-categories" element={<AddCategories />} />
            <Route path="gallery" element={<UpdateGallery />} />
            <Route path="reservation" element={<ManageReservation />} />
            <Route path="offers" element={<ManageOffers />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/menu/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
             <Route path="/order-confirmation" element={<OrderConfirmation />} />
            
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
