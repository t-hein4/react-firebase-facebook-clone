import { Divider, Stack } from "@mui/material";
import FriendRequestsSection from "./FriendRequestsSection";

const Friends = () => {
  return (
    <Stack spacing={1} divider={<Divider />} bgcolor="white" p={2}>
      <FriendRequestsSection />
    </Stack>
  );
};

export default Friends;
