import { Typography } from "@mui/material";

const defaultStyle = {
  fontSize: "inherit",
};

const BaseDot = () => {
  return <Typography sx={defaultStyle}> &#9679;</Typography>;
};

export default BaseDot;
