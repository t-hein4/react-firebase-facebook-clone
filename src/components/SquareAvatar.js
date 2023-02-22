import React from "react";
import BaseAvatar from "./Base/BaseAvatar";

const SquareAvatar = (props) => {
  const { displayName, photoURL } = props;
  return (
    <BaseAvatar
      displayName={displayName}
      photoURL={photoURL}
      square
      width={140}
      height={140}
      borderRadius="8px 8px 0 0"
    />
  );
};

export default SquareAvatar;
