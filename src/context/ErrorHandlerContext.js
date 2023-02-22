import { createContext } from "react";

const ErrorHandlerContext = createContext(() => {});

let setError = () => {};

const ErrorHandlerProvider = (props) => {
  if (props.callback) {
    setError = props.callback;
  }

  return (
    <ErrorHandlerContext.Provider value={{ setError, error: props.error }}>
      {props.children}
    </ErrorHandlerContext.Provider>
  );
};

export { ErrorHandlerProvider };

export default ErrorHandlerContext;
