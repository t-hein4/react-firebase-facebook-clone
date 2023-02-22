import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";

function Type({ type }) {
  const renderType = () => {
    if (type === "Public") {
      return <PublicIcon sx={{ fontSize: "inherit" }} />;
    } else if (type === "Friends") {
      return <PeopleIcon sx={{ fontSize: "inherit" }} />;
    } else if (type === "Only Me") {
      return <PersonIcon sx={{ fontSize: "inherit" }} />;
    }
  };

  return <>{renderType()}</>;
}

Type.propTypes = {
  type: PropTypes.string,
};

export default Type;
