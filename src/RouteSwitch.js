import { Route, Routes } from "react-router-dom";
import App from "./App";
import Page from "./components/Page";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { routes } from "./data/routes";
import { AuthContextProvider } from "./context/AuthContext";
import RequiredAuth from "./pages/RequiredAuth";
import { ThemeProvider } from "@mui/material";
import myTheme from "./theme.js";
import ErrorContainer from "./components/Error/ErrorContainer";
import UserProfile from "./pages/UserProfile";
import DetailedPost from "./pages/DetailedPost";

function RouteSwitch() {
  return (
    <ErrorContainer>
      <AuthContextProvider>
        <ThemeProvider theme={myTheme}>
          <Routes>
            <Route path="/" element={<App />}>
              {routes.map(({ path, id, title, component, titleColor }) => (
                <Route
                  key={id}
                  path={path}
                  element={
                    <RequiredAuth>
                      <Page
                        title={title}
                        titleColor={titleColor}
                        component={component}
                      />
                    </RequiredAuth>
                  }
                />
              ))}
              <Route path="users">
                <Route
                  path=":userId/posts/:postId"
                  element={
                    <RequiredAuth>
                      <DetailedPost />
                    </RequiredAuth>
                  }
                />
                <Route
                  path=":friendId"
                  element={
                    <RequiredAuth>
                      <Page component={<UserProfile />} />
                    </RequiredAuth>
                  }
                />
              </Route>
            </Route>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </AuthContextProvider>
    </ErrorContainer>
  );
}

export default RouteSwitch;
