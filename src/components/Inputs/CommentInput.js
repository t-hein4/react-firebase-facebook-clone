import PropTypes from "prop-types";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";

const CommentInput = (props) => {
  const { comment, onChange } = props;
  return (
    <FormControl fullWidth>
      <Input
        disableUnderline
        autoFocus
        value={comment}
        placeholder="Write a comment..."
        onChange={onChange}
        endAdornment={
          <>
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => console.log("click")}>
                <CameraAltOutlinedIcon />
              </IconButton>
            </InputAdornment>
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => console.log("click")}>
                <SentimentSatisfiedOutlinedIcon />
              </IconButton>
            </InputAdornment>
          </>
        }
      />
    </FormControl>
  );
};

CommentInput.propTypes = {
  comment: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CommentInput;
