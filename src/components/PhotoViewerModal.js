import { CardMedia, Stack } from "@mui/material";
import PropTypes from "prop-types";
import BaseModal from "./Base/BaseModal";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

function PhotoViewerModal(props) {
  const { open, onClose, fileURL } = props;
  return (
    <BaseModal open={open} onClose={onClose}>
      <Stack sx={defaultStyle}>
        <CardMedia component="img" src={fileURL} />
      </Stack>
    </BaseModal>
  );
}

PhotoViewerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fileURL: PropTypes.string.isRequired,
};

export default PhotoViewerModal;
