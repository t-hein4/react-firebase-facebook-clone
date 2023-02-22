import { AvatarGroup } from "@mui/material";
import PropTypes from "prop-types";
import BaseAvatar from "./BaseAvatar";

const BaseAvatarGroup = (props) => {
  const { users } = props;
  return (
    <AvatarGroup
      max={3}
      sx={{
        "& .MuiAvatarGroup-avatar": {
          width: 24,
          height: 24,
        },
      }}
    >
      {users.map((user) => (
        <BaseAvatar
          displayName={user.displayName}
          photoURL={user.photoURL}
          key={user.id}
        />
      ))}
    </AvatarGroup>
  );
};

BaseAvatarGroup.propTypes = {
  users: PropTypes.array.isRequired,
};

export default BaseAvatarGroup;
