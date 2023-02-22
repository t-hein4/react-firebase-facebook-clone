import { CardActions } from "@mui/material";
import PropTypes from "prop-types";

const defaultStyle = {
  display: "flex",
  justifyContent: "space-around",
  gap: "5px",
};

const BaseButtonsGroup = (props) => {
  const { children } = props;

  return <CardActions sx={defaultStyle}>{children}</CardActions>;
};

BaseButtonsGroup.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BaseButtonsGroup;
