import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import PropTypes from "prop-types";

const defaultStyle = {
  width: "100vw",
  height: "100vh",
};

const DrawerBtn = (props) => {
  const { anchor, button, drawer } = props;
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {button(toggleDrawer(anchor, true))}
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <Box sx={defaultStyle} role="presentation">
          {drawer(toggleDrawer(anchor, false))}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

DrawerBtn.propTypes = {
  anchor: PropTypes.string.isRequired,
  button: PropTypes.func.isRequired,
  drawer: PropTypes.func.isRequired,
};

export default DrawerBtn;
