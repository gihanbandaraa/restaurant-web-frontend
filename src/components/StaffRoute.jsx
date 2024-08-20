import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const StaffRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isStaff ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default StaffRoute;
