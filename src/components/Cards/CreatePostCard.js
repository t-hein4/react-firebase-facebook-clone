import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import DrawerBtn from "../Buttons/DrawerBtn";
import CreatePostDrawer from "../Drawers/CreatePostDrawer";
import WhatsOnYourMindBtn from "../Buttons/WhatsOnYourMindBtn";
import ActionBtns from "../ActionBtns";
import { reelRoomGroup } from "../../actions";
import { useAuthContext } from "../../context/AuthContext";
import BaseAvatar from "../Base/BaseAvatar";

const CreatePostCard = () => {
  const context = useAuthContext();

  return (
    <Card>
      <CardHeader
        avatar={
          <BaseAvatar
            displayName={context.user.displayName}
            photoURL={context.user.photoURL}
          />
        }
        title={
          <DrawerBtn
            anchor="bottom"
            button={(toggleDrawer) => (
              <WhatsOnYourMindBtn
                onClick={toggleDrawer}
                displayName={context.user.displayName}
              />
            )}
            drawer={(toggleDrawer) => (
              <CreatePostDrawer
                user={context.user}
                toggleDrawer={toggleDrawer}
              />
            )}
          />
        }
      />
      <Divider sx={{ width: "95%", margin: "0 auto" }} />
      <CardActions sx={{ backgroundColor: "#white" }}>
        <ActionBtns color={"black"} actions={reelRoomGroup} />
      </CardActions>
    </Card>
  );
};

export default CreatePostCard;
