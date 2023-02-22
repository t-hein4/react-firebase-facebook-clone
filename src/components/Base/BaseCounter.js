import { Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const defaultStyle = {
  color: "gray",
  fontSize: "0.7rem",
  textDecoration: "underline",
};

const BaseCounter = (props) => {
  const { name, counts, loading } = props;
  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width="100px" height={10} />
      ) : (
        <Typography variant="body2" sx={defaultStyle}>
          {counts} {name}
        </Typography>
      )}
    </>
  );
};

BaseCounter.propTypes = {
  name: PropTypes.string.isRequired,
  counts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};

export default BaseCounter;
