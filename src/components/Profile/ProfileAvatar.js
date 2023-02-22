import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Stack, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

const ProfileAvatar = () => {
  const context = useAuthContext();
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,0.5)",
          height: 200,
          marginBottom: "100px",
          position: "relative",
          borderRadius: "15px 15px 0 0",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <CameraAltIcon
              alt="Remy Sharp"
              sx={{
                width: 30,
                height: 30,
                border: "2px solid white",
                borderRadius: "100%",
                bgcolor: "rgba(190,190,190)",
                color: "white",
                padding: "5px",
              }}
            />
          }
          sx={{
            position: "absolute",
            top: "calc(100% - 100px)",
            left: "calc(50% - 100px)",
          }}
        >
          <Avatar
            alt={context.user.displayName}
            src={context.user.photoURL}
            sx={{
              width: 200,
              height: 200,
              border: "2px solid white",
              bgcolor: "rgb(190,190,190)",
            }}
          />
        </Badge>
      </Box>
      <Typography variant="h2" align="center">
        {context.user.displayName}
      </Typography>
    </Stack>
  );
};

export default ProfileAvatar;
