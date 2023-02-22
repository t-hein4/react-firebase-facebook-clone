import { Avatar, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const BaseAvatar = (props) => {
  const {
    displayName,
    photoURL,
    loading,
    width,
    height,
    square,
    borderRadius,
  } = props;
  return (
    <>
      {loading ? (
        <Skeleton variant="circular">
          <Avatar sx={{ width, height }} />
        </Skeleton>
      ) : (
        <Avatar
          arial-label={displayName}
          src={photoURL}
          variant={square && "square"}
          sx={{ width, height, borderRadius }}
        />
      )}
    </>
  );
};

BaseAvatar.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  square: PropTypes.bool,
  borderRadius: PropTypes.string,
};

export default BaseAvatar;
