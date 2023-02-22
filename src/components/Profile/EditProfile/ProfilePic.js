import { Typography, Button, Stack } from "@mui/material";
import DrawerBtn from "../../Buttons/DrawerBtn";
import SelectPhotoDrawer from "../../Drawers/SelectPhotoDrawer";
import { useAuthContext } from "../../../context/AuthContext";
import BaseAvatar from "../../Base/BaseAvatar";

function ProfilePic() {
  const context = useAuthContext();
  return (
    <Stack alignItems="center">
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Typography variant="h3">Profile Picture</Typography>
        <DrawerBtn
          anchor={"bottom"}
          button={(toggleDrawer) => (
            <Button size="small" onClick={() => toggleDrawer(true)}>
              Add
            </Button>
          )}
          drawer={(toggleDrawer) => (
            <SelectPhotoDrawer toggleDrawer={() => toggleDrawer(false)} />
          )}
        />
      </Stack>
      <BaseAvatar
        displayName={context.user.displayName}
        photoURL={context.user.photoURL}
        width={150}
        height={150}
      />
    </Stack>
  );
}

export default ProfilePic;
