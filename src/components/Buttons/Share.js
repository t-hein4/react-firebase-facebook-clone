import { Button, Skeleton } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useState } from "react";
import ShareDialog from "../ShareDialog";
import PropTypes from "prop-types";

const Share = (props) => {
  const { postId, ownerId, loading } = props;
  const [dialog, setDialog] = useState(false);

  const handleClickShareDialog = () => {
    setDialog((prev) => !prev);
  };

  return (
    <>
      {loading ? (
        <Skeleton>
          <Button size="small" fullWidth />
        </Skeleton>
      ) : (
        <Button
          onClick={handleClickShareDialog}
          size="small"
          fullWidth
          startIcon={<ReplyOutlinedIcon />}
          endIcon="Share"
          color="inherit"
        />
      )}
      <ShareDialog
        open={dialog}
        handleClickShareDialog={handleClickShareDialog}
        postId={postId}
        ownerId={ownerId}
      />
    </>
  );
};

Share.propTypes = {
  postId: PropTypes.string,
  ownerId: PropTypes.string,
  loading: PropTypes.bool,
};

export default Share;
