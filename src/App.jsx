import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderConfirmation from "./components/OrderConfirmation";

import NotFound from "./components/NotFound";

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
import ManageOrders from "./pages/Admin/pages/ManageOrders";
import ManageQueries from "./pages/Admin/pages/ManageQueries";

import StaffRoute from "./components/StaffRoute";  // Use the correct StaffRoute here
import StaffNavBar from "./pages/Staff/components/StaffNavBar";
import StaffDashboard from "./pages/Staff/StaffDashboard";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff");

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
    "/admin/orders",
    "/admin/queries",
    "/staff",
    "/staff/reservation",
    "/staff/orders",
    "/staff/queries",
  ];

  const isDefinedRoute = routes.includes(location.pathname);

  return (
    <>
      {isDefinedRoute && (
        <>
          {isAdminRoute && <AdminNavBar />}
          {isStaffRoute  && <StaffNavBar />}
          {!isAdminRoute && !isStaffRoute && <NavBar />}
        </>
      )}

      <Routes>
        {isAdminRoute ? (
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="update-menu" element={<UpdateMenu />} />
            <Route path="add-categories" element={<AddCategories />} />
            <Route path="gallery" element={<UpdateGallery />} />
            <Route path="reservation" element={<ManageReservation />} />
            <Route path="offers" element={<ManageOffers />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="queries" element={<ManageQueries />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : isStaffRoute ? (
          <Route path="/staff/*" element={<StaffRoute />}>
            <Route path="" element={<StaffDashboard />} />
            <Route path="reservation" element={<ManageReservation />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="queries" element={<ManageQueries />} />
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
      {isDefinedRoute && !isAdminRoute && !isStaffRoute && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
