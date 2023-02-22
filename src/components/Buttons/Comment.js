import { Button, Skeleton } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Comment = (props) => {
  const { postId, userId, disabled, loading } = props;
  const navigate = useNavigate();

  const handleClickDetailedPost = () => {
    navigate(`/users/${userId}/posts/${postId}`);
  };

  return (
    <>
      {loading ? (
        <Skeleton>
          <Button size="small" fullWidth />
        </Skeleton>
      ) : (
        <Button
          disabled={disabled}
          onClick={handleClickDetailedPost}
          size="small"
          color="inherit"
          fullWidth
          startIcon={<ChatBubbleOutlineOutlinedIcon />}
          endIcon="Comment"
        />
      )}
    </>
  );
};

Comment.propTypes = {
  postId: PropTypes.string,
  userId: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Comment;
