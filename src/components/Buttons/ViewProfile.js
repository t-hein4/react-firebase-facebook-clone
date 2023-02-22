import { Button } from "@mui/material";
import PropTypes from "prop-types";

function ViewProfile(props) {
  const { onClick } = props;
  return (
    <Button fullWidth variant="contained" onClick={onClick}>
      View Profile
    </Button>
  );
}

ViewProfile.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ViewProfile;
