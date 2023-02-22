import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import PropTypes from "prop-types";

const Accept = (props) => {
  const { friendId } = props;
  const context = useAuthContext();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickAcceptFriend = async (event) => {
    event.stopPropagation();
    setLoading(true);
    await FB.handleFriendShip(context.user.id, friendId, "accept");
    setLoading(false);
    setAccepted(true);
  };

  return (
    <Button
      fullWidth
      variant="contained"
      disabled={accepted}
      onClick={handleClickAcceptFriend}
    >
      {loading ? (
        <CircularProgress sx={{ color: "rgb(190,190,190)", padding: "10px" }} />
      ) : (
        <>{accepted ? "Accepted" : "Confirm"}</>
      )}
    </Button>
  );
};

Accept.propTypes = {
  friendId: PropTypes.string,
};

export default Accept;
