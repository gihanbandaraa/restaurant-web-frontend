import { useState } from "react";

const useAlert = () => {
  const [alertInfo, setAlertInfo] = useState({
    showAlert: false,
    type: "",
    message: "",
  });

  const handleShowAlert = (type, message) => {
    setAlertInfo({
      showAlert: true,
      type: type,
      message: message,
    });
  };

  const handleCloseAlert = () => {
    setAlertInfo({
      ...alertInfo,
      showAlert: false,
    });
  };

  return {
    alertInfo,
    handleShowAlert,
    handleCloseAlert,
  };
};

export default useAlert;
