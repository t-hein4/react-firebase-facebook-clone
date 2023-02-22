import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const Search = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      size="medium"
      edge="start"
      color="inherit"
      aria-label="search"
      onClick={onClick}
      sx={{ backgroundColor: "#F1F3F4" }}
    >
      <SearchIcon />
    </IconButton>
  );
};

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Search;
