import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Post = (props) => {
  const { onClick, input } = props;
  return (
    <Button
      disabled={!input}
      disableElevation
      variant="contained"
      size="small"
      aria-label="post"
      onClick={onClick}
    >
      Post
    </Button>
  );
};

Post.propTypes = {
  onClick: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
};

export default Post;
