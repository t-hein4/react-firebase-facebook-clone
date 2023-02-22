import {
  Input,
  Typography,
  Skeleton,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import React from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

function PhotoPicker(props) {
  const { onChange, id, photo, onSave } = props;
  return (
    <>
      <label htmlFor={id}>
        <Input
          onChange={onChange}
          accept="image/*"
          id={id}
          type="file"
          style={{ display: "none" }}
        />
        <Button
          aria-label="upload picture"
          startIcon={<PhotoLibraryIcon />}
          endIcon="Choose a photo"
          variant="blue"
          component="span"
        />
      </label>
      {photo.file && (
        <Stack spacing={3} alignItems="center">
          <Typography variant="h3">Preview profile picture</Typography>
          {photo.fileURI ? (
            <Avatar
              sx={{ width: "300px", height: "300px", borderRadius: "50%" }}
              src={photo.fileURI}
              alt={photo.file.name}
            />
          ) : (
            <Skeleton
              animation="pulse"
              variant="circular"
              width={300}
              height={300}
            />
          )}
          <Button onClick={onSave}>Save</Button>
        </Stack>
      )}
    </>
  );
}

export default PhotoPicker;
