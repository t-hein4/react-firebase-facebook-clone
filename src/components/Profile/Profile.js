import { Divider, Stack, Typography } from "@mui/material";
import About from "./About";
import CoverPhoto from "./CoverPhoto";
import Friends from "./Friends";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import PostContainer from "../Home/PostContainer";
import FriendCardSM from "../Cards/FriendCardSM";
import CreatePostCard from "../Cards/CreatePostCard";
import useGetUserData from "../../hooks/useGetUserData";
import Shortcuts from "./Shortcuts";
import InfiniteScroll from "react-infinite-scroll-component";

function Profile() {
  const context = useAuthContext();
  const userData = useGetUserData(context.user.id);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setFriends([]);
      await FB.getAllFriends(userData, setFriends);
      setLoading(false);
    })();
  }, [userData]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPosts([]);
      await FB.getInitUserPosts({
        userId: context.user.id,
        setPosts,
        setLastVisible,
        setHasMore,
      });
      setLoading(false);
    })();
  }, [context.user.id]);

  const handleClickShowProfile = (friendId) => {
    navigate(`/users/${friendId}`);
    setFriends([]);
  };

  const getMorePosts = async () => {
    await FB.getMoreUserPosts({
      userId: context.user.id,
      setPosts,
      lastVisible,
      setLastVisible,
      setHasMore,
    });
  };

  return (
    <Stack spacing={1} divider={<Divider />} bgcolor="#F0F2F5" p={1}>
      <CoverPhoto />
      <About />
      <>
        <Friends />
        <Stack direction="row" rowGap={2} columnGap={2} flexWrap="wrap">
          {friends.map((friend) => (
            <FriendCardSM
              key={friend.id}
              friend={friend}
              handleClickShowProfile={handleClickShowProfile}
            />
          ))}
        </Stack>
      </>
      <>
        <Typography variant="h3">Posts</Typography>
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={
            <Stack py={1}>
              <PostContainer loading post={{}} />
            </Stack>
          }
        >
          <Stack spacing={1}>
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
        <Shortcuts />
        <CreatePostCard />
      </>
    </Stack>
  );
}

export default Profile;
