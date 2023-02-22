import { useState, useCallback } from "react";
import { ErrorHandlerProvider } from "../../context/ErrorHandlerContext";
import Error from "./Error";

const ErrorContainer = (props) => {
  const [error, setError] = useState();
  const [errorTitle, setErrorTitle] = useState();
  const [action, setAction] = useState();

  if (error) {
    console.error("ERROR", errorTitle, JSON.stringify(error));
  }

  const callback = useCallback((title, err, action) => {
    console.log("ERROR RAISED");
    console.log("Error title: ", title);
    console.log("Error content", JSON.stringify(err));
    setError(err);
    setErrorTitle(title);
    setAction(action);
  }, []);

  const clearError = () => {
    setError(null);
    setErrorTitle("");
  };

  return (
    <ErrorHandlerProvider callback={callback} error={error}>
      {props.children}
      {error && <Error error={error} onClose={clearError} />}
    </ErrorHandlerProvider>
  );
};

export default ErrorContainer;
