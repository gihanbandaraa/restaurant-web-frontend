import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Alert = ({ type, message, showAlert, onClose }) => {
  const [visible, setVisible] = useState(showAlert);

  useEffect(() => {
    setVisible(showAlert);
    if (showAlert) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [showAlert, onClose]);

  return (
    <div
      className={` absolute top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <FaCheckCircle className="text-white mr-2" />
        ) : (
          <FaTimesCircle className="text-white mr-2" />
        )}
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
