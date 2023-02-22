import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FB from "../FB";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Time from "../components/Time";
import Type from "../components/Type";
import Like from "../components/Buttons/Like";
import Comment from "../components/Buttons/Comment";
import Share from "../components/Buttons/Share";
import CommentContainer from "../components/Home/CommentContainer";
import CommentsContainer from "../components/Home/CommentsContainer";
import { Box } from "@mui/system";
import PostCard from "../components/Cards/PostCard";
import LikesCounter from "../components/LikesCounter";
import BaseCounter from "../components/Base/BaseCounter";

function DetailedPost() {
  const { userId, postId } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [sharedPost, setSharedPost] = useState({});

  useEffect(() => {
    (async () => {
      const post = await FB.getPost(userId, postId);
      setPost(post);
    })();
  }, [userId, postId]);

  useEffect(() => {
    (async () => {
      const userData = await FB.getUserData(userId);
      setUser(userData);
    })();
  }, [userId]);

  useEffect(() => {
    if (post.activity === "share") {
      (async () => {
        setSharedPost(await FB.getPostByRef(post.postRef));
      })();
    }
  }, [post.activity, post.postRef]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" elevation={1} color="inherit">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <Avatar src={user.photoURL} alt={user.displayName} />
            <Stack>
              <Typography variant="h5">{user.displayName}</Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                fontSize="0.75rem"
              >
                {post.timestamp && <Time timestamp={post.timestamp} />}
                <Typography sx={{ fontSize: "inherit" }}> &#9679;</Typography>
                <Type type={post.type} />
              </Stack>
            </Stack>
          </Stack>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack
        py={3}
        mx="auto"
        divider={<Divider />}
        bgcolor="white"
        width={{ xs: "100%", md: "60%", lg: "50%" }}
      >
        <>
          <Typography variant="body2" sx={{ padding: "8px" }}>
            {post.text}
          </Typography>
          {post.fileURL && (
            <Box
              component="img"
              src={post.fileURL}
              alt="file"
              loading="lazy"
              width="100%"
              sx={{ marginBottom: "10px" }}
            />
          )}
        </>
        {post.activity === "share" && sharedPost && (
          <Stack spacing={1} p={1}>
            <PostCard post={sharedPost} loading={false} share />
          </Stack>
        )}
        <Stack direction="row" justifyContent="space-between" p={1}>
          <LikesCounter
            likedPosts={user.likedPost}
            postId={post.id}
            likes={post.likes}
          />
          <BaseCounter name="Comments" counts={post.totalComments} />
        </Stack>
        <Stack direction="row" p={1}>
          <Like post={post} />
          <Comment postId={post.id} userId={user.id} disabled />
          <Share postId={post.id} ownerId={user.id} />
        </Stack>
        <>
          <Typography variant="h5" sx={{ padding: "8px" }}>
            All comments
          </Typography>
          <CommentsContainer postId={post.id} userId={user.id} />
        </>
      </Stack>
      <Toolbar sx={{ marginTop: "30px" }} />
      <AppBar
        color="inherit"
        position="fixed"
        sx={{ top: "auto", bottom: 0, paddingBottom: "55px", zIndex: "0" }}
      >
        <Toolbar>
          <CommentContainer postId={post.id} ownerId={user.id} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DetailedPost;
