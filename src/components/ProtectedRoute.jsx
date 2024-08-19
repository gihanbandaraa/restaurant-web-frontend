import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCartItems } from "../redux/cart/cartSlice";

const ProtectedRoute = ({ children }) => {
  const cartItems = useSelector(selectCartItems);
  if (cartItems.length === 0) {
    return <Navigate to="/menu" />;
  }

  return children;
};

export default ProtectedRoute;
