import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon from react-icons

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white mb-32 text-center">
        <div className="flex flex-col md:flex-row items-center gap-2 p-5 ">
          <FaCheckCircle className="text-green-500 text-4xl md:text-5xl mb-6" />{" "}
          <h2 className="text-2xl md:text-5xl font-bold text-green-500 mb-4">
            Thank You for Your Order!
          </h2>
        </div>
        <p className="text-lg text-green-600 font-semibold mb-2">
          Your order has been successfully placed.
        </p>
        <p className="text-green-500 mb-6">
          A confirmation email has been sent to your inbox.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white font-bold px-6 py-2 rounded-md shadow-md"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
