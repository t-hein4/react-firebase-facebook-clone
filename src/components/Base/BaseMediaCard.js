import { Divider, Card, CardActions } from "@mui/material";
import BaseCounter from "./BaseCounter";
import useGetUserDataRT from "../../hooks/useGetUserDataRT";
import { useNavigate } from "react-router-dom";
import BaseCardHeader from "./BaseCardHeader";
import LikesCounter from "../LikesCounter";
import TimeType from "../TimeType";
import PropTypes from "prop-types";
import LikeCommentShareBtns from "../LikeCommentShareBtns";

const BaseMediaCard = (props) => {
  const { post, loading, children, share } = props;
  const navigate = useNavigate();
  const userData = useGetUserDataRT();

  const handleClickDetailedPost = (event) => {
    navigate(`/users/${post.userId}/posts/${post.id}`);
  };

  return (
    <Card>
      <BaseCardHeader
        onClick={handleClickDetailedPost}
        loading={loading}
        displayName={post.displayName}
        photoURL={post.photoURL}
        activity={post.activity}
      >
        <TimeType
          timestamp={post.timestamp}
          type={post.type}
          loading={loading}
        />
      </BaseCardHeader>
      {children}
      {!share && (
        <>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <LikesCounter
              likedPosts={userData.likedPosts}
              postId={post.id}
              likes={post.likes}
            />
            <BaseCounter
              name={"Comments"}
              counts={post.totalComments}
              loading={loading}
            />
          </CardActions>
          <Divider sx={{ width: "97%", margin: "0 auto" }} />
          <LikeCommentShareBtns post={post} loading={loading} />
          <Divider sx={{ width: "97%", margin: "0 auto" }} />
        </>
      )}
    </Card>
  );
};

BaseMediaCard.defaultProps = {
  share: false,
};

BaseMediaCard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BaseMediaCard;
