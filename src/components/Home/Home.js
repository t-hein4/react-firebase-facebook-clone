import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import FB from "../../FB";
import CreatePostCard from "../Cards/CreatePostCard";
import PostContainer from "./PostContainer";

const Home = () => {
  const context = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([
        FB.getAllPosts({
          userId: context.user.id,
          setPosts,
        }),
      ]);
      setLoading(false);
    })();
  }, [context.user.id]);

  return (
    <Stack spacing={1} m={1}>
      <CreatePostCard />
      {loading ? (
        <>
          <PostContainer loading post={{}} />
          <PostContainer loading post={{}} />
          <PostContainer loading post={{}} />
        </>
      ) : (
        <Stack spacing={1}>
          {posts.map((post) => (
            <PostContainer post={post} loading={loading} key={post.id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Home;
