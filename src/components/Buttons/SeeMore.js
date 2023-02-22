import { Button } from "@mui/material";
import PropTypes from "prop-types";

const SeeMore = (props) => {
  const { onClick, checked } = props;
  return (
    <Button fullWidth variant="contained" color="inherit" onClick={onClick}>
      {checked ? "See Less" : "See More"}
    </Button>
  );
};

SeeMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default SeeMore;
