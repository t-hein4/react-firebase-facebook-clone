import { Typography, Button, Stack } from "@mui/material";
import CreatePostCard from "../CreatePostCard";
import ChatIcon from "@mui/icons-material/Chat";

function Posts() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Posts</Typography>
        <Button size="small">Filters</Button>
      </Stack>
      <CreatePostCard />
      <Button
        fullWidth
        variant="grey"
        startIcon={<ChatIcon />}
        endIcon="Manage Posts"
      />
    </Stack>
  );
}

export default Posts;
