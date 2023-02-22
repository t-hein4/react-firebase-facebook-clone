import { useEffect, useState } from "react";
import Comments from "./Comments";
import FB from "../../FB";
import PropTypes from "prop-types";

const CommentsContainer = (props) => {
  const { postId, userId } = props;
  const [comments, setComments] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);

  const handleClickMoreComments = () => {
    FB.getMoreComments({
      userId,
      postId,
      lastVisible,
      setComments,
      setLastVisible,
    });
  };

  useEffect(() => {
    FB.getInitComments({ userId, postId, setComments, setLastVisible });
  }, [userId, postId]);

  return (
    <Comments
      comments={comments}
      lastVisible={lastVisible}
      onClick={handleClickMoreComments}
    />
  );
};

CommentsContainer.propTypes = {
  postId: PropTypes.string,
  userId: PropTypes.string,
};

export default CommentsContainer;
