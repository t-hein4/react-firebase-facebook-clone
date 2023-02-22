import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SquareAvatar from "../SquareAvatar";

const defaultStyle = {
  borderRadius: 1,
  cursor: "pointer",
  gap: "5px",
  display: "flex",
  flexDirection: "column",
};

const FriendCardSM = (props) => {
  const { friend } = props;
  const navigate = useNavigate();

  const handleClickShowProfile = () => {
    navigate(`/users/${friend.id}`);
  };

  return (
    <Paper sx={defaultStyle} onClick={handleClickShowProfile}>
      <SquareAvatar
        displayName={friend.displayName}
        photoURL={friend.photoURL}
      />
      <Typography variant="h5">{friend.displayName}</Typography>
    </Paper>
  );
};

FriendCardSM.propTypes = {
  friend: PropTypes.object,
};

export default FriendCardSM;
