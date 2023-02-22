import { Typography } from "@mui/material";
import ProfilePic from "../Profile/EditProfile/ProfilePic";
import CoverPhoto from "../Profile/EditProfile/CoverPhoto";
import BaseDrawer from "../Base/BaseDrawer";
import Back from "../Buttons/Back";
import DrawerTitle from "../DrawerTitle";
import PropTypes from "prop-types";

const EditProfileDrawer = (props) => {
  const { toggleDrawer } = props;
  return (
    <BaseDrawer
      header={
        <>
          <Back onClick={toggleDrawer} />
          <DrawerTitle title="Edit Profile" />
        </>
      }
      body={
        <>
          <ProfilePic />
          <CoverPhoto />
          <Typography>Bio</Typography>
          <Typography>Describe yourself...</Typography>
          <Typography>Details</Typography>
        </>
      }
    />
  );
};

EditProfileDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default EditProfileDrawer;
