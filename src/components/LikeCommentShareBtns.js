import BaseButtonsGroup from "./Base/BaseButtonsGroup";
import Comment from "./Buttons/Comment";
import Like from "./Buttons/Like";
import Share from "./Buttons/Share";
import PropTypes from "prop-types";

const LikeCommentShareBtns = (props) => {
  const { post, loading } = props;

  return (
    <BaseButtonsGroup>
      <>
        <Like post={post} loading={loading} />
        <Comment postId={post.id} userId={post.userId} loading={loading} />
        <Share postId={post.id} ownerId={post.userId} loading={loading} />
      </>
    </BaseButtonsGroup>
  );
};

BaseButtonsGroup.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
};

export default LikeCommentShareBtns;
