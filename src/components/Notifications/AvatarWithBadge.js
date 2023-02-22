import { Avatar, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function AvatarWithBadge() {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <NotificationsIcon
          sx={{
            width: 25,
            height: 25,
            borderRadius: "100%",
            bgcolor: "rgb(100,100,100)",
            color: "white",
            padding: "5px",
          }}
        />
      }
    >
      <Avatar alt="Travis Howard" src="" sx={{ width: 80, height: 80 }} />
    </Badge>
  );
}

export default AvatarWithBadge;
