import { lazy, Suspense } from "react";
import Loading from "../pages/Loading";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Home from "../components/Home/Home";
const Friends = lazy(() => import("../components/Friends/Friends"));
const Profile = lazy(() => import("../components/Profile/Profile"));
const Notifications = lazy(() =>
  import("../components/Notifications/Notifications")
);
const Menu = lazy(() => import("../components/Menu/Menu"));

export const routes = [
  {
    id: "nav-01",
    path: "",
    label: "Home",
    title: "facebook",
    titleColor: "primary",
    icon: <HomeIcon />,
    component: <Home />,
  },
  {
    id: "nav-02",
    path: "friends",
    label: "Friends",
    title: "Friends",
    icon: <GroupIcon />,
    component: (
      <Suspense fallback={<Loading />}>
        <Friends />
      </Suspense>
    ),
  },
  {
    id: "nav-03",
    path: "profile",
    label: "Profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
    component: (
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    id: "nav-04",
    path: "notifications",
    label: "Notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
    component: (
      <Suspense fallback={<Loading />}>
        <Notifications />
      </Suspense>
    ),
  },
  {
    id: "nav-05",
    path: "menu",
    label: "Menu",
    title: "Menu",
    icon: <MenuIcon />,
    component: (
      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
    ),
  },
];
