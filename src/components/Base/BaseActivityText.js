import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import generateActivityText from "../../utils/generateActivityText";

const BaseActivityText = (props) => {
  const { activity } = props;

  return (
    <Typography component="span" variant="body2">
      {generateActivityText(activity)}
    </Typography>
  );
};

BaseActivityText.propTypes = {
  activity: PropTypes.string.isRequired,
};

export default BaseActivityText;
