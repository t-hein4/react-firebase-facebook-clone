import { Box } from "@mui/system";
import React from "react";

function Loading({ children }) {
  return (
    <Box
      sx={{
        height: "500px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        gap: "25px",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default Loading;
