import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LargeAvatar from "../LargeAvatar";
import BaseAvatarGroup from "./BaseAvatarGroup";
import PropTypes from "prop-types";

const defaultStyle = {
  cursor: "pointer",
};

const BaseUserCard = (props) => {
  const { user, children, toggleDrawer } = props;
  const navigate = useNavigate();
  const handleClickShowProfile = (event) => {
    event.stopPropagation();
    navigate(`/users/${user.id}`);
    toggleDrawer && toggleDrawer();
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      spacing={1}
      bgcolor="white"
      onClick={handleClickShowProfile}
      sx={defaultStyle}
    >
      <LargeAvatar displayName={user.displayName} photoURL={user.photoURL} />
      <Stack spacing={1}>
        <Typography variant="h5">{user.displayName}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <BaseAvatarGroup users={[]} />
          <Typography variant="body2">2 mutual friends</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

BaseUserCard.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
  toggleDrawer: PropTypes.func,
};

export default BaseUserCard;
