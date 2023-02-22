import { Button } from "@mui/material";
import React from "react";
import { useAuthContextUpdater } from "../../context/AuthContext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Logout = () => {
  const context = useAuthContextUpdater();

  const handleClickSignOut = () => {
    context.handleSignOut();
  };

  return (
    <Button
      fullWidth
      variant="contained"
      color="inherit"
      onClick={handleClickSignOut}
      startIcon={<LogoutOutlinedIcon />}
      endIcon="Log Out"
    />
  );
};

export default Logout;
