import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const CommentIconBtn = (props) => {
  const { postId } = props;
  return (
    <IconButton form={`comment-form-${postId}`} type="submit">
      <SendOutlinedIcon />
    </IconButton>
  );
};

CommentIconBtn.propTypes = {
  postId: PropTypes.string,
};

export default CommentIconBtn;
