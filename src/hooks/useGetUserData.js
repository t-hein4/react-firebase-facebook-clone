import { useEffect, useState } from "react";
import FB from "../FB";

function useGetUserData(userId) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const userData = await FB.getUserData(userId);
      setUserData(userData);
    })();
  }, [userId]);

  return userData;
}

export default useGetUserData;
