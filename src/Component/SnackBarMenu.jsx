import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function SnackBarMenu(props) {
  const [open, setOpen] = useState(props.openSnackBar);

  useEffect(() => {
    setOpen(props.openSnackBar);
  }, [props.openSnackBar]);

  const handleClose = (event, reason) => {
    setOpen(false);
    if (reason === "clickaway") {
      return;
    }
    props.onClose();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBarMenu;
