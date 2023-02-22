import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const defaultStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
};
const DrawerTitle = (props) => {
  const { title } = props;
  return (
    <Typography variant="h3" sx={defaultStyle}>
      {title}
    </Typography>
  );
};

DrawerTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DrawerTitle;
