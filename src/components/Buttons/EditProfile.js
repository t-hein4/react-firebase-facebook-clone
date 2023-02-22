import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const EditProfile = (props) => {
  const { onClick } = props;

  return (
    <Button
      fullWidth
      startIcon={<EditIcon />}
      endIcon={"Edit Profile"}
      onClick={onClick}
      variant="contained"
      color="inherit"
    />
  );
};

EditProfile.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditProfile;
