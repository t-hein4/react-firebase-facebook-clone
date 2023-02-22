import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import myTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Outlet />
      <Nav />
    </ThemeProvider>
  );
}

export default App;
