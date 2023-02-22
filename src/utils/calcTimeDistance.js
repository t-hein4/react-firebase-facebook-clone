import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const calcTimeDistance = (timestamp) => {
  return formatDistanceToNowStrict(timestamp.toDate());
};

export default calcTimeDistance;
