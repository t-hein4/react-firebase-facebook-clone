import BaseCounter from "./Base/BaseCounter";
import _ from "lodash";

function LikesCounter(props) {
  const { likedPosts, postId, likes } = props;

  const generateText = () => {
    if (likedPosts && _.some(likedPosts, ["id", postId])) {
      return `You and ${likes.length - 1} others `;
    } else {
      return likes.length;
    }
  };

  return <>{likes && <BaseCounter name="likes" counts={generateText()} />}</>;
}

export default LikesCounter;
