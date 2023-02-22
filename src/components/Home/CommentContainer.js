import { useState } from "react";
import CommentBox from "./CommentBox";
import FB from "../../FB";
import { useAuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

const CommentContainer = (props) => {
  const { postId, ownerId, loading } = props;
  const [comment, setComment] = useState("");
  const context = useAuthContext();

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await FB.createComment({
      ownerId,
      userId: context.user.id,
      postId,
      comment,
    });
    setComment("");
  };

  return (
    <CommentBox
      comment={comment}
      onChange={handleChangeComment}
      onSubmit={handleSubmitComment}
      postId={postId}
      loading={loading}
    />
  );
};

CommentContainer.propTypes = {
  ownerId: PropTypes.string,
  postId: PropTypes.string,
  loading: PropTypes.bool,
};

export default CommentContainer;
