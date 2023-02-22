import { Avatar, Stack, Skeleton } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import CommentInput from "../Inputs/CommentInput";
import BaseAvatar from "../Base/BaseAvatar";
import CommentIconBtn from "../Buttons/CommentIconBtn";
import PropTypes from "prop-types";

const responsiveWidth = { xs: "100%", md: "60%", lg: "50%" };

const CommentBox = (props) => {
  const { comment, onChange, onSubmit, postId, loading } = props;
  const context = useAuthContext();
  return (
    <>
      {loading ? (
        <Stack direction="row" gap={2} width={"100%"} p={1}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <Skeleton width="100%" sx={{ borderRadius: "9999px" }} />
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ flex: "none" }}
          />
        </Stack>
      ) : (
        <Stack
          mx="auto"
          width={responsiveWidth}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          p={1}
          component="form"
          onSubmit={onSubmit}
          id={`comment-form-${postId}`}
        >
          <BaseAvatar
            displayName={context.user.displayName}
            photoURL={context.user.photoURL}
          />
          <CommentInput comment={comment} onChange={onChange} />
          <CommentIconBtn postId={postId} />
        </Stack>
      )}
    </>
  );
};

CommentBox.propTypes = {
  comment: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  postId: PropTypes.string,
  loading: PropTypes.bool,
};

export default CommentBox;
