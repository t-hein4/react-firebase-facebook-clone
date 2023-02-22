import { Modal } from "@mui/material";
import PropTypes from "prop-types";

const defaultStyle = {
  bgcolor: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
};

function BaseModal(props) {
  const { open, onClose, children } = props;
  return (
    <Modal open={open} onClose={onClose} sx={defaultStyle}>
      {children}
    </Modal>
  );
}

BaseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BaseModal;
