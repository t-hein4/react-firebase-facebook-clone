import { useState } from "react";
import { IconButton, Box, Stack } from "@mui/material";
import UnstyledSelectObjectValues from "../Select";
import WhatsOnYourMind from "../Inputs/WhatsOnYourMind";
import { useAuthContext } from "../../context/AuthContext";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Clear from "../Buttons/Clear";
import FB from "../../FB";
import BaseDrawer from "../Base/BaseDrawer";
import BaseCardHeader from "../Base/BaseCardHeader";
import Post from "../Buttons/Post";
import DrawerTitle from "../DrawerTitle";
import PropTypes from "prop-types";
import readURI from "../../utils/readURI";
import BaseFileUploadBtn from "../Base/BaseFileUploadBtn";

const CreatePostDrawer = (props) => {
  const { toggleDrawer } = props;
  const context = useAuthContext();
  const [input, setInput] = useState("");
  const [file, setFile] = useState({ file: "", fileURI: "" });
  const [type, setType] = useState("Public");

  const handleClickPost = async () => {
    FB.createPost({
      userId: context.user.id,
      text: input,
      file: file.file,
      type,
    });
    toggleDrawer();
    setInput("");
  };

  const handleChangeType = (newType) => {
    setType(newType);
  };

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    setFile((prev) => ({ ...prev, file }));
    readURI(event, setFile);
  };

  return (
    <BaseDrawer
      header={
        <>
          <Clear onClick={toggleDrawer} />
          <DrawerTitle title="Create Post" />
          <Post onClick={handleClickPost} input={input} />
        </>
      }
      body={
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <BaseCardHeader
              photoURL={context.user.photoURL}
              displayName={context.user.displayName}
            >
              <UnstyledSelectObjectValues
                option={type}
                onChange={handleChangeType}
              />
            </BaseCardHeader>
            <BaseFileUploadBtn id="photo-uploader" onChange={handleChangeFile}>
              <IconButton aria-label="upload picture" component="span">
                <PhotoLibraryIcon sx={{ color: "green" }} />
              </IconButton>
            </BaseFileUploadBtn>
          </Stack>
          <WhatsOnYourMind input={input} onChange={handleChangeInput} />
          {file.fileURI && (
            <>
              <Clear onClick={() => setFile({ file: null, fileURI: null })} />
              <Box sx={{ width: "60%" }} component={"img"} src={file.fileURI} />
            </>
          )}
        </>
      }
    />
  );
};

CreatePostDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default CreatePostDrawer;
