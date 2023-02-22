import { useNavigate } from "react-router-dom";
import BaseUserCard from "../Base/BaseUserCard";
import ViewProfile from "../Buttons/ViewProfile";
import PropTypes from "prop-types";

const FriendCard = (props) => {
  const { user, toggleDrawer } = props;
  const navigate = useNavigate();
  const handleClickShowProfile = () => {
    navigate(`/users/${user.id}`);
    toggleDrawer();
  };
  return (
    <BaseUserCard user={user} toggleDrawer={toggleDrawer}>
      <ViewProfile friendId={user.id} onClick={handleClickShowProfile} />
    </BaseUserCard>
  );
};

FriendCard.propTypes = {
  user: PropTypes.object,
  toggleDrawer: PropTypes.func.isRequired,
};

export default FriendCard;
