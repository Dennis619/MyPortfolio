import React, { createContext, useContext, useState, useCallback } from "react";
import SnackBarMenu from "../SnackBarMenu.jsx";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbarDetails, setSnackbarDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbarDetails({ open: true, message, severity });
  }, []);

  const closeSnackbar = () => {
    setSnackbarDetails((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackBarMenu
        openSnackBar={snackbarDetails.open}
        message={snackbarDetails.message}
        severity={snackbarDetails.severity}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};
