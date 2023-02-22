import { useAuthContext } from "../../context/AuthContext";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const WhatsOnYourMind = (props) => {
  const { onChange } = props;
  const context = useAuthContext();
  return (
    <TextField
      sx={{ bgcolor: "white" }}
      fullWidth
      autoFocus
      multiline
      variant="filled"
      onChange={onChange}
      aria-label={`what's on your mind, ${context.user.displayName}?`}
      placeholder={`What's on your mind, ${context.user.displayName}?`}
    />
  );
};

WhatsOnYourMind.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default WhatsOnYourMind;
