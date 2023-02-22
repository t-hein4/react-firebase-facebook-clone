import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import FB from "../FB";

function useGetUserDataRT() {
  const context = useAuthContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    FB.getUserDataRT(context.user.id, setUser);
  }, [context.user.id]);

  return user;
}

export default useGetUserDataRT;
