import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCartItems } from "../redux/cart/cartSlice";

import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const cartItems = useSelector(selectCartItems);
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    toast.error("Before proceeding, please sign in or sign up.");
    return <Navigate to="/sign-in" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/menu" />;
  }

  return children;
};

export default ProtectedRoute;
