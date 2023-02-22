import { CardMedia } from "@mui/material";
import PropTypes from "prop-types";

const defaultStyle = {
  margin: "0 auto",
  width: "90%",
  aspectRatio: "1/1",
  borderRadius: "100%",
  padding: "10px",
  border: "0.5px solid black",
  cursor: "pointer",
};

const ProfilePicture = (props) => {
  const { onClick, fileURL } = props;
  return (
    <CardMedia
      onClick={onClick}
      component="img"
      src={fileURL}
      sx={defaultStyle}
    />
  );
};

ProfilePicture.propTypes = {
  onClick: PropTypes.func.isRequired,
  fileURL: PropTypes.string,
};

export default ProfilePicture;
