import ActivityCard from "../Cards/ActivityCard";
import PostCard from "../Cards/PostCard";
import PropTypes from "prop-types";

const PostContainer = (props) => {
  const { post, loading } = props;
  return (
    <>
      {post.activity ? (
        <ActivityCard post={post} loading={loading} />
      ) : (
        <PostCard post={post} loading={loading} />
      )}
    </>
  );
};

PostContainer.defaultProps = {
  post: {},
};

PostContainer.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
};

export default PostContainer;
