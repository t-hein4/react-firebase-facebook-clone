import BaseAvatar from "./Base/BaseAvatar";

function LargeAvatar(props) {
  const { displayName, photoURL, loading } = props;

  return (
    <BaseAvatar
      displayName={displayName}
      photoURL={photoURL}
      loading={loading}
      width={80}
      height={80}
    />
  );
}

export default LargeAvatar;
