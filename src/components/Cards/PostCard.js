import BaseMediaCard from "../Base/BaseMediaCard";
import { CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import PhotoViewerModal from "../PhotoViewerModal";
import PropTypes from "prop-types";

const PostCard = (props) => {
  const { post, share, loading } = props;
  const [modal, setModal] = useState(false);

  return (
    <BaseMediaCard post={post} loading={loading} share={share}>
      <>
        <CardContent sx={{ paddingTop: "0" }}>
          <Typography variant="body2" noWrap>
            {loading ? (
              <>
                <Skeleton height={10} sx={{ marginBottom: 0.5 }} />
                <Skeleton height={10} width="80%" />
              </>
            ) : (
              post.text
            )}
          </Typography>
        </CardContent>
        {loading ? (
          <Skeleton height={190} variant="rectangular" />
        ) : (
          <>
            {post.fileURL && (
              <CardMedia
                component="img"
                src={post.fileURL}
                alt={post.fileURL}
                onClick={() => setModal((prev) => !prev)}
                sx={{
                  cursor: "pointer",
                  objectFit: "contain",
                  width: "100%",
                  height: "auto",
                }}
                loading="lazy"
                width="500"
                height="500"
              />
            )}
          </>
        )}
        {modal && (
          <PhotoViewerModal
            open={modal}
            fileURL={post.fileURL}
            onClose={() => setModal((prev) => !prev)}
          />
        )}
      </>
    </BaseMediaCard>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  share: PropTypes.bool,
  loading: PropTypes.bool,
};

export default PostCard;
