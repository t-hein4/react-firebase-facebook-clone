import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

const Clear = (props) => {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="hide post"
      sx={{ width: "fit-content" }}
      onClick={onClick}
    >
      <ClearIcon fontSize="small" />
    </IconButton>
  );
};

Clear.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Clear;
