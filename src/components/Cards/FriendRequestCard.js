import { Button } from "@mui/material";
import React from "react";
import BaseUserCard from "../Base/BaseUserCard";
import Accept from "../Buttons/Accept";
import PropTypes from "prop-types";

const FriendRequestCard = (props) => {
  const { friend } = props;

  return (
    <BaseUserCard user={friend}>
      <>
        <Accept friendId={friend.id} />
        <Button fullWidth variant="contained" color="inherit">
          Delete
        </Button>
      </>
    </BaseUserCard>
  );
};

FriendRequestCard.propTypes = {
  friend: PropTypes.object,
};

export default FriendRequestCard;
