import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerBtn from "./Buttons/DrawerBtn";
import { Divider } from "@mui/material";
import SearchDrawer from "./Drawers/SearchDrawer";
import HideOnScroll from "./HideOnScroll";
import Search from "./Buttons/Search";

export default function HideAppBar(props) {
  const { title, titleColor } = props;
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          elevation={0}
          sx={{
            color: "black",
            backgroundColor: "white",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3" component="h1" color={titleColor}>
              {title}
            </Typography>
            <DrawerBtn
              anchor="right"
              button={(toggleDrawer) => <Search onClick={toggleDrawer} />}
              drawer={(toggleDrawer) => (
                <SearchDrawer toggleDrawer={toggleDrawer} />
              )}
            />
          </Toolbar>
          <Divider />
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
