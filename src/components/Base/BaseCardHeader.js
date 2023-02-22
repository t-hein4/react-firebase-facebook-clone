import BaseAvatar from "./BaseAvatar";
import BaseUsername from "./BaseUsername";
import PropTypes from "prop-types";
import { CardHeader } from "@mui/material";
import BaseActivityText from "./BaseActivityText";

const defaultStyle = {
  cursor: "pointer",
  paddingBottom: 1,
};

const BaseCardHeader = (props) => {
  const { activity, displayName, photoURL, onClick, loading, children } = props;

  return (
    <CardHeader
      sx={defaultStyle}
      onClick={onClick}
      avatar={
        <BaseAvatar
          displayName={displayName}
          photoURL={photoURL}
          loading={loading}
        />
      }
      title={
        <>
          <BaseUsername displayName={displayName} loading={loading} />
          {activity && <BaseActivityText activity={activity} />}
        </>
      }
      subheader={children}
    />
  );
};

BaseCardHeader.propTypes = {
  activity: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default BaseCardHeader;
