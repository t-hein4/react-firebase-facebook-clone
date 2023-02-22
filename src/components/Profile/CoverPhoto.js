import DrawerBtn from "../Buttons/DrawerBtn";
import EditProfileDrawer from "../Drawers/EditProfileDrawer";
import ProfileAvatar from "./ProfileAvatar";
import { useAuthContext } from "../../context/AuthContext";
import { Stack } from "@mui/material";
import EditProfile from "../Buttons/EditProfile";
import AddToStory from "../Buttons/AddToStory";
import More from "../Buttons/More";

function CoverPhoto() {
  const context = useAuthContext();
  return (
    <Stack spacing={2}>
      <ProfileAvatar
        displayName={context.user.displayName}
        avatarSrc={context.user.photoURL}
      />
      <Stack direction="row" spacing={1}>
        <AddToStory />
        <DrawerBtn
          anchor={"right"}
          button={(toggleDrawer) => <EditProfile onClick={toggleDrawer} />}
          drawer={(toggleDrawer) => (
            <EditProfileDrawer toggleDrawer={toggleDrawer} />
          )}
        />
        <More />
      </Stack>
    </Stack>
  );
}

export default CoverPhoto;
