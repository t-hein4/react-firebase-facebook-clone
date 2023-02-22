import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

function MenuButtonCard({ name }) {
  return (
    <Stack spacing={1} bgcolor="white" p={1} borderRadius={2}>
      <Avatar src="" width={40} height={40} />
      <Typography>{name}</Typography>
    </Stack>
  );
}

export default MenuButtonCard;
