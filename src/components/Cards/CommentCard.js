import { Avatar, Button, Stack, Typography } from "@mui/material";
import Time from "../Time";
import PropTypes from "prop-types";

const CommentCard = (props) => {
  const { displayName, timestamp, text, photoURL } = props;
  return (
    <Stack direction="row" spacing={1} p={1}>
      <Avatar src={photoURL} />
      <Stack>
        <Stack bgcolor="rgb(220,220,220)" p={1} spacing={1} borderRadius={2}>
          <Typography variant="h5">{displayName}</Typography>
          <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
            {text}
          </Typography>
        </Stack>
        <Stack direction="row" pt={0.5} spacing={1}>
          {timestamp && <Time timestamp={timestamp} />}
          <Button size="small" sx={{ color: "gray", minWidth: 0 }}>
            Like
          </Button>
          <Button size="small" sx={{ color: "gray", minWidth: 0 }}>
            Reply
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

CommentCard.propTypes = {
  displayName: PropTypes.string,
  timestamp: PropTypes.object,
  text: PropTypes.string,
  photoURL: PropTypes.string,
};

export default CommentCard;
