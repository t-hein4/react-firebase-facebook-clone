import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Typography,
  Toolbar,
  Box,
  Slide,
} from "@mui/material";
import WhatsOnYourMind from "./Inputs/WhatsOnYourMind";
import UnstyledSelectObjectValues from "./Select";
import { forwardRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Clear from "./Buttons/Clear";
import FB from "../FB";
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShareDialog(props) {
  const { open, handleClickShareDialog, postId, ownerId } = props;
  const context = useAuthContext();
  const [type, setType] = useState("Friends");

  const [input, setInput] = useState("");
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };
  const handleClickShare = async () => {
    handleClickShareDialog();
    // create post
    const data = {
      text: input,
      activity: "share",
      userId: context.user.id,
      type,
      postId,
      ownerId,
    };

    await FB.createPost(data);
    // update post
    await FB.updatePostSharedBy({ userId: context.user.id, postId, ownerId });
  };

  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={Transition}
      aria-labelledby="responsive-dialog-title"
    >
      <AppBar elevation={0} sx={{ bgcolor: "white", position: "relative" }}>
        <Toolbar
          sx={{
            color: "black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Clear onClick={handleClickShareDialog} />
            <Avatar src={context.user.photoURL} />
            <div>
              <Typography>{context.user.displayName}</Typography>
              <UnstyledSelectObjectValues
                option={type}
                onChange={(newType) => setType(newType)}
              />
            </div>
          </Box>
          <Button variant="contained" size="small" onClick={handleClickShare}>
            Share Now
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <WhatsOnYourMind onChange={handleChangeInput} />
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
