import { Button } from "@mui/material";
import CommentCard from "../Cards/CommentCard";
import PropTypes from "prop-types";

const Comments = (props) => {
  const { comments, onClick } = props;
  return (
    <>
      <Button sx={{ width: "fit-content" }} onClick={onClick}>
        View previous comments
      </Button>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          text={comment.text}
          displayName={comment.displayName}
          photoURL={comment.photoURL}
          timestamp={comment.timestamp}
        />
      ))}
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default Comments;
