import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";

export type Params = {
  message: string | undefined;
  info: boolean | undefined;
  onClose: () => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarAlert: React.FC<Params> = ({ message, onClose, info }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway' && info) {
      return;
    }

    setOpen(false);
    onClose()
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1500000}
      onClose={handleClose}
      message={message}
    >
      <Alert onClose={onClose} severity={info? "info": "error"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
