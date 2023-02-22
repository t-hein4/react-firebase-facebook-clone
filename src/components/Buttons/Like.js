import { alpha, Button, Skeleton } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import useGetUserDataRT from "../../hooks/useGetUserDataRT";
import _ from "lodash";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PropTypes from "prop-types";

const Like = (props) => {
  const { post, loading } = props;
  const context = useAuthContext();
  const userData = useGetUserDataRT();

  const handleClickLike = async () => {
    await FB.updatePostLikes({
      ownerId: post.userId,
      userId: context.user.id,
      postId: post.id,
    });
  };

  return (
    <>
      {loading ? (
        <Skeleton>
          <Button size="small" fullWidth />
        </Skeleton>
      ) : (
        <Button
          size="small"
          color="inherit"
          fullWidth
          onClick={handleClickLike}
          startIcon={<ThumbUpOutlinedIcon />}
          endIcon="Like"
          disabled={
            userData.likedPosts && _.some(userData.likedPosts, ["id", post.id])
          }
          sx={{
            bgcolor:
              userData.likedPosts &&
              _.some(userData.likedPosts, ["id", post.id]) &&
              alpha("#1878f3", 0.2),
          }}
        />
      )}
    </>
  );
};

Like.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
};

export default Like;
