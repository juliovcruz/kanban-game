import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

export type Params = {
  message: string | undefined;
  onClose: () => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarAlert: React.FC<Params> = ({ message, onClose }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={15000}
      onClose={onClose}
      message={message}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
