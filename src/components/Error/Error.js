import { useState, useEffect } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const Transition = (props) => {
  return <Slide {...props} direction="left" />;
};

const Error = ({ error, onClose }) => {
  const [transition, setTransition] = useState(undefined);

  useEffect(() => {
    if (error) {
      setTransition(() => Transition);
    }
  }, [error]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={error}
      autoHideDuration={6000}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
      onClose={onClose}
    >
      <Alert severity="error" onClose={onClose}>
        {error.code}
      </Alert>
    </Snackbar>
  );
};

export default Error;
