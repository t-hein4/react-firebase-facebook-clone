import React from "react";
import PropTypes from "prop-types";
import { Input } from "@mui/material";

const BaseFileUploadBtn = (props) => {
  const { id, children, onChange } = props;
  return (
    <label htmlFor={id}>
      <Input
        onChange={onChange}
        accept="image/*"
        id={id}
        type="file"
        sx={{ display: "none" }}
      />
      {children}
    </label>
  );
};

BaseFileUploadBtn.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BaseFileUploadBtn;
