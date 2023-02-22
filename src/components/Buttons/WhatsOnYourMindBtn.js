import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const WhatsOnYourMindBtn = (props) => {
  const { onClick, displayName } = props;
  return (
    <Chip
      disableRipple
      disableTouchRipple
      clickable
      onClick={onClick}
      label={`What's on your mind, ${displayName} ?`}
      sx={{
        fontWeight: "normal",
        display: "flex",
        justifyContent: "left",
        backgroundColor: "white",
        ":active": {
          boxShadow: "none",
        },
        ":hover": {
          bgcolor: "white",
        },
      }}
    />
  );
};

WhatsOnYourMindBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  displayName: PropTypes.string,
};

export default WhatsOnYourMindBtn;
