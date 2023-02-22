import { Button } from "@mui/material";
import Add from "../Buttons/Add";
import BaseUserCard from "../Base/BaseUserCard";
import PropTypes from "prop-types";

const UserCard = (props) => {
  const { user, toggleDrawer } = props;
  return (
    <BaseUserCard user={user} toggleDrawer={toggleDrawer}>
      <>
        <Add friendId={user.id} />
        <Button fullWidth variant="contained" color="inherit">
          Remove
        </Button>
      </>
    </BaseUserCard>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
  toggleDrawer: PropTypes.func,
};

export default UserCard;
