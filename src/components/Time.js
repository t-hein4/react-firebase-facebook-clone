import { Typography } from "@mui/material";
import calcTimeDistance from "../utils/calcTimeDistance";
import PropTypes from "prop-types";

function Time({ timestamp }) {
  const time = calcTimeDistance(timestamp);
  return <Typography sx={{ fontSize: "inherit" }}>{time}</Typography>;
}

Time.propTypes = {
  timestamp: PropTypes.object,
};

export default Time;
