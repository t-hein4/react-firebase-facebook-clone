import { CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import useGetUserData from "../../hooks/useGetUserData";
import BaseMediaCard from "../Base/BaseMediaCard";
import PhotoViewerModal from "../PhotoViewerModal";
import ProfilePicture from "../ProfilePicture";
import PostCard from "./PostCard";
import PropTypes from "prop-types";

const ActivityCard = (props) => {
  const { post, loading } = props;
  const context = useAuthContext();
  const user = useGetUserData(context.user.id);
  const [modal, setModal] = useState(false);
  const [sharedPost, setSharedPost] = useState({});

  useEffect(() => {
    if (post.activity === "share") {
      (async () => {
        setSharedPost(await FB.getPostByRef(post.postRef));
      })();
    }
  }, [post.activity, post.postRef]);

  const renderCard = (activity) => {
    switch (activity) {
      case "share":
        return (
          <Stack spacing={1} p={1}>
            <Typography variant="body2"> {post.text}</Typography>
            <PostCard post={sharedPost} loading={loading} share />
          </Stack>
        );
      case "profile picture":
        return (
          <ProfilePicture
            onClick={() => setModal(true)}
            fileURL={post.fileURL}
          />
        );
      case "dob":
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const dob =
          user.dob && user.dob.toDate().toLocaleDateString("en-US", options);
        return (
          <CardContent>
            <Typography variant="h3" align="center">
              Born on {dob}
            </Typography>
          </CardContent>
        );
      default:
        return;
    }
  };

  return (
    <BaseMediaCard post={post} loading={loading}>
      <>
        {renderCard(post.activity)}
        {modal && (
          <PhotoViewerModal
            open={modal}
            onClose={() => setModal(false)}
            fileURL={post.fileURL}
          />
        )}
      </>
    </BaseMediaCard>
  );
};

ActivityCard.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
};

export default ActivityCard;
