import { IconButton, Stack, Typography } from "@mui/material";
import AvatarWithBadge from "./AvatarWithBadge";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Notifications() {
  return (
    <Stack spacing={1} p={1} bgcolor="white">
      <Typography variant="h3">Earlier</Typography>
      <Stack direction="row" spacing={3}>
        <AvatarWithBadge />
        <Stack spacing={1}>
          <Typography>
            Welcome to Facebook! Tap here to find people you know and add them
            as friends.
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>3d</Typography>
        </Stack>
        <IconButton sx={{ height: "fit-content" }}>
          <MoreHorizIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Notifications;
