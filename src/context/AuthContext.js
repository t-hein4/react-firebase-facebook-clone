import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import FB from "../FB";

const AuthContext = createContext();
const AuthContextUpdater = createContext();

// const token = "tv8siu5wvhtl6ma8xijtud9gz0e8rh963cahxv95";
const existingUser = JSON.parse(sessionStorage.getItem("user"));

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(existingUser || null);
  const [authenticating, setAuthenticating] = useState(true);

  const handleSignUp = useCallback(async (user) => {
    await FB.setAuthStatePersistence(user, FB.createUser);
    const { displayName, photoURL, uid } = auth.currentUser;
    setUser({ displayName, photoURL, id: uid });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ displayName, photoURL, id: uid })
    );

    const data = {
      activity: "dob",
      type: "Friends",
      userId: uid,
    };
    await FB.createPost(data);
    setAuthenticating(false);
  }, []);

  const handleSignIn = useCallback(async (user) => {
    await FB.setAuthStatePersistence(user, FB.signIn);

    if (auth.currentUser) {
      const { displayName, photoURL, uid } = auth.currentUser;
      setUser({ displayName, photoURL, id: uid });
      sessionStorage.setItem(
        "user",
        JSON.stringify({ displayName, photoURL, id: uid })
      );
      setAuthenticating(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await FB.logOut();
    setUser(null);
    sessionStorage.setItem("user", JSON.stringify(null));
  }, []);

  const handleUpdate = async (updates) => {
    await updateProfile(auth.currentUser, {
      photoURL: updates.photoURL,
    });
    const { displayName, photoURL, uid } = auth.currentUser;
    setUser({ displayName, photoURL, id: uid });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ displayName, photoURL, id: uid })
    );
    setAuthenticating(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({ displayName, photoURL, id: uid });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ displayName, photoURL, id: uid })
        );
        setAuthenticating(false);
      } else {
        setAuthenticating(false);
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      authenticating,
    }),
    [user, authenticating]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthContextUpdater.Provider
        value={{ handleSignUp, handleSignIn, handleSignOut, handleUpdate }}
      >
        {children}
      </AuthContextUpdater.Provider>
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext was used outside of its Provider");
  }
  return context;
}

export function useAuthContextUpdater() {
  const update = useContext(AuthContextUpdater);
  if (update === undefined) {
    throw new Error("useAuthContextUpdater was used outside of its Provider");
  }
  return update;
}
