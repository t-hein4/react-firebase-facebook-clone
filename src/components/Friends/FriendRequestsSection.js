import { Button, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import FriendRequestCard from "../Cards/FriendRequestCard";
import FB from "../../FB";

const FriendRequestsSection = () => {
  const context = useAuthContext();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    FB.getAllPendingRequests(context.user.id, setPendingRequests);
  }, [context.user.id]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Friend Requests</Typography>
        {pendingRequests.length > 0 && (
          <Button arial-label="see all friend requests" size="small">
            See All
          </Button>
        )}
      </Stack>
      {pendingRequests.length > 0 ? (
        <>
          {pendingRequests.map((pendingRequest) => (
            <FriendRequestCard
              friend={pendingRequest}
              key={pendingRequest.id}
            />
          ))}
          <Button fullWidth variant="contained" color="inherit">
            See All
          </Button>
        </>
      ) : (
        <>
          <Typography align="center" variant="h3">
            No New Requests
          </Typography>
          <Typography align="center">
            Try searching your friends by their name.
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default FriendRequestsSection;
