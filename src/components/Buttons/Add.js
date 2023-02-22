import { Button } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import PropTypes from "prop-types";

const Add = (props) => {
  const { friendId } = props;
  const context = useAuthContext();
  const [added, setAdded] = useState(false);

  const handleClickAddFriend = async (event) => {
    event.stopPropagation();
    await FB.handleFriendShip(context.user.id, friendId, "request");
    setAdded(true);
  };

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleClickAddFriend}
      disabled={added}
    >
      {added ? "Requested" : "Add Friend"}
    </Button>
  );
};

Add.propTypes = {
  friendId: PropTypes.string,
};

export default Add;
