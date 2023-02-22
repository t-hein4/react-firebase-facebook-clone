import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PropTypes from "prop-types";

const Back = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      size="small"
      edge="start"
      color="inherit"
      aria-label="search"
      onClick={onClick}
      sx={{ m: 1 }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

Back.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Back;
