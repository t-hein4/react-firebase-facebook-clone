import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FB from "../FB";
import Loading from "./Loading";
import { useAuthContext } from "../context/AuthContext";
import FriendCardSM from "../components/Cards/FriendCardSM";
import PostContainer from "../components/Home/PostContainer";
import InfiniteScroll from "react-infinite-scroll-component";

function UserProfile() {
  const params = useParams();
  const context = useAuthContext();
  const [userData, setUserData] = useState({});
  const [mutualFriends, setMutualFriends] = useState(0);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (userData.friends)
      (async () => {
        setMutualFriends(0);
        if (userData.friends.some((friend) => friends.includes(friend))) {
          setMutualFriends((prev) => (prev += 1));
        }
      })();
  }, [userData.friends, friends]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const userData = await FB.getUserData(params.friendId);
      setUserData(userData);
      setFriends([]);
      await FB.getAllFriends(userData, setFriends);
      setLoading(false);
    })();
  }, [params.friendId]);

  useEffect(() => {
    (async () => {
      setPosts([]);
      await FB.getInitUserPosts({
        userId: params.friendId,
        setPosts,
        setLastVisible,
        setHasMore,
      });
    })();
  }, [params.friendId]);

  const getMorePosts = async () => {
    await FB.getMoreUserPosts({
      userId: params.friendId,
      setPosts,
      lastVisible,
      setLastVisible,
      setHasMore,
    });
  };

  return (
    <>
      {loading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <Stack divider={<Divider />} p={1} spacing={2} bgcolor="#F0F2F5">
          <>
            <Avatar
              src={userData.photoURL}
              sx={{ width: 140, height: 140, border: "5px solid white" }}
            />
            <Typography variant="h2">{userData.displayName}</Typography>
            {userData.requestedFriends &&
              userData.requestedFriends.some(
                (friend) => friend.id === context.user.id
              ) && (
                <>
                  <Typography variant="h3" align="center">
                    Sent you a friend request
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button fullWidth variant="contained">
                      Respond
                    </Button>
                    <Button fullWidth variant="contained" color="inherit">
                      Message
                    </Button>
                    <Button variant="contained" color="inherit">
                      <MoreHorizOutlinedIcon />
                    </Button>
                  </Stack>
                </>
              )}
          </>
          <Typography>Works at</Typography>
          <>
            <Typography variant="h3">Friends</Typography>
            <Typography variant="body2">
              {friends ? `${friends.length}` : "0"} ({mutualFriends} mutual)
            </Typography>
            <Stack direction="row" rowGap={2} columnGap={2} flexWrap="wrap">
              {friends.map((friend) => (
                <FriendCardSM key={friend.id} friend={friend} />
              ))}
            </Stack>
          </>
          <Stack>
            <Typography variant="h3">Posts</Typography>
            {posts.length > 0 ? (
              <InfiniteScroll
                dataLength={posts.length}
                next={getMorePosts}
                hasMore={hasMore}
                loader={
                  <Stack spacing={1}>
                    <PostContainer loading post={{}} />
                  </Stack>
                }
              >
                <Stack py={1}>
                  {posts.map((post) => (
                    <PostContainer
                      post={{
                        ...post,
                        displayName: userData.displayName,
                        photoURL: userData.photoURL,
                      }}
                      loading={loading}
                      key={post.id}
                    />
                  ))}
                </Stack>
              </InfiniteScroll>
            ) : (
              <Paper
                sx={{
                  padding: "100px 0",
                  margin: "10px 0",
                }}
              >
                <Typography variant="h3" align="center">
                  No Post Yet
                </Typography>
              </Paper>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default UserProfile;
