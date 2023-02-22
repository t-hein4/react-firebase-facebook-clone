import ErrorHandlerContext from "../context/ErrorHandlerContext";
import { useContext } from "react";

const useErrorHandler = () => useContext(ErrorHandlerContext);

export default useErrorHandler;
