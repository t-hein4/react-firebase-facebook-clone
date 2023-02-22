import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  query,
  setDoc,
  startAt,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import _ from "lodash";
import { auth, db, storage } from "./firebase";

export default (() => {
  // Authentication

  const setAuthStatePersistence = async (user, next) => {
    await setPersistence(auth, browserSessionPersistence);
    return next(user);
  };

  const createUser = async (user) => {
    const { email, password } = user;
    await createUserWithEmailAndPassword(auth, email, password);
    await updateUserProfile(user);
    await createUserDoc({ ...auth.currentUser, ...user });
  };

  const signIn = async (user) => {
    const { email, password } = user;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (user) => {
    const { firstName, lastName, phoneNumber } = user;
    await updateProfile(auth.currentUser, {
      displayName: firstName + " " + lastName,
      phoneNumber,
    });
  };

  // Firestore
  // -- users

  const createUserDoc = async (user) => {
    const { uid, displayName, email, phoneNumber, photoURL, dob, gender } =
      user;
    await setDoc(
      doc(db, "users", uid),
      {
        displayName,
        email,
        phoneNumber,
        photoURL,
        dob,
        gender,
        lowerCaseName: user.displayName.toLowerCase(),
      },
      {
        merge: true,
      }
    );
  };

  const getUserData = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const userData = { ...userDoc.data(), id: userDoc.id };
    return userData;
  };

  const getUserDataRT = (userId, setUser) => {
    const userDocRef = doc(db, "users", userId);
    onSnapshot(userDocRef, (snapshot) => {
      setUser({ ...snapshot.data(), id: snapshot.id });
    });
  };

  const getUserDataByRef = async (userRef) => {
    const userDocRef = doc(db, `users/${userRef}`);
    const userDoc = await getDoc(userDocRef);
    const userData = { ...userDoc.data(), id: userDoc.id };
    return userData;
  };

  const getUsersByName = (name) => {
    const q = query(
      collection(db, "users"),
      orderBy("lowerCaseName"),
      startAt(name.toLowerCase()),
      endAt(name.toLowerCase() + "\uf8ff")
    );
    return getDocumentsInQuery(q);
  };

  const updateUserDocument = async (userId, updates) => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, updates);
  };

  // -- general

  const getDocumentsInQuery = async (query) => {
    const documents = await getDocs(query);
    return documents.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const getDocumentsInQueryRT = async ({
    query,
    setDocs,
    setLastVisible,
    setHasMore,
  }) => {
    onSnapshot(query, { includeMetadataChanges: true }, (snapshot) => {
      setLastVisible && setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      if (snapshot.empty) setHasMore && setHasMore(false);
      snapshot.docChanges().forEach(async (change) => {
        const userData = await getUserDataByRef(change.doc.data().by.id);
        if (change.type === "added") {
          setDocs((prev) =>
            _.orderBy(
              _.uniqBy(
                prev.concat({
                  displayName: userData.displayName,
                  photoURL: userData.photoURL,
                  userId: userData.id,
                  ...change.doc.data(),
                  id: change.doc.id,
                }),
                "id"
              ),
              ["timestamp.seconds"],
              ["desc"]
            )
          );
        } else if (change.type === "modified") {
          const update = {
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            userId: userData.id,
            ...change.doc.data(),
            id: change.doc.id,
          };
          setDocs((prev) =>
            prev.map((post) => (post.id === change.doc.id ? update : post))
          );
        }
      });
    });
  };

  // -- users -- posts

  const createPost = async (data) => {
    const {
      userId,
      text = "",
      file = "",
      type,
      activity = "",
      postId,
      ownerId,
    } = data;
    const filePath = file && `${userId}/posts/${file.name}`;
    const { fileSnapShot, publicFileURL } =
      file && (await uploadFile({ filePath, file }));

    const post = {
      text: text && text,
      activity: activity && activity,
      likes: [],
      timestamp: serverTimestamp(),
      by: doc(db, `users/${userId}`),
      totalComments: 0,
      fileURL: file && publicFileURL,
      storageURI: file && fileSnapShot.metadata.fullPath,
      type,
      userId,
      postRef: doc(db, `users/${ownerId}/posts/${postId}`),
    };

    const postsRef = collection(db, `users/${userId}/posts`);
    const postRef = await addDoc(postsRef, post);

    if (type === "Public") {
      const globalPostDocRef = doc(db, `globalPosts`, postRef.id);
      await setDoc(globalPostDocRef, post);
    }
  };

  const getPost = async (userId, postId) => {
    const postDocRef = doc(db, `users/${userId}/posts`, postId);
    const postDoc = await getDoc(postDocRef);
    const postData = { ...postDoc.data(), id: postDoc.id };
    return postData;
  };

  const updatePostSharedBy = async ({ userId, ownerId, postId }) => {
    const postDocRef = doc(db, `users/${ownerId}/posts`, postId);
    const update = {
      sharedBy: arrayUnion(doc(db, `users/${userId}`)),
    };
    await updateDoc(postDocRef, update);
  };

  const getPostByRef = async (ref) => {
    const postDocRef = doc(db, ref.path);
    const postDoc = await getDoc(postDocRef);
    const postData = { ...postDoc.data(), id: postDoc.id };
    const userData = await getUserData(postData.userId);
    return {
      ...postData,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
    };
  };

  const getInitUserPosts = async ({
    userId,
    setPosts,
    setLastVisible,
    setHasMore,
  }) => {
    const q = query(collection(db, `users/${userId}/posts`), limit(2));
    return await getDocumentsInQueryRT({
      query: q,
      setDocs: setPosts,
      setLastVisible,
      setHasMore,
    });
  };

  const getMoreUserPosts = async ({
    userId,
    setPosts,
    lastVisible,
    setLastVisible,
    setHasMore,
  }) => {
    const q = query(
      query(collection(db, `users/${userId}/posts`), limit(5)),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(5)
    );
    getDocumentsInQueryRT({
      query: q,
      setDocs: setPosts,
      setLastVisible,
      setHasMore,
    });
  };

  const getAllPosts = async ({ userId, setPosts }) => {
    const gq = query(collection(db, "globalPosts"));
    const userData = await getUserData(userId);
    if (userData.friends) {
      userData.friends.forEach(async (friend) => {
        const q = query(
          collection(db, `users/${friend.id}/posts`),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        await getDocumentsInQueryRT({
          query: q,
          setDocs: setPosts,
        });
      });
    }
    await getDocumentsInQueryRT({
      query: gq,
      setDocs: setPosts,
    });
  };

  const updatePostLikes = async ({ ownerId, userId, postId }) => {
    const postDocRef = doc(db, `users/${ownerId}/posts`, `${postId}`);
    const globalPostDocRef = doc(db, `globalPosts`, `${postId}`);

    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postDocRef);
      const globalPostDoc = await transaction.get(globalPostDocRef);

      if (postDoc.exists()) {
        const newLikes = arrayUnion(doc(db, `users/${userId}`));
        transaction.update(postDocRef, { likes: newLikes });
      }
      if (globalPostDoc.exists()) {
        const newLikes = arrayUnion(doc(db, `users/${userId}`));
        transaction.update(globalPostDocRef, { likes: newLikes });
      }
    });

    await updateUserDocument(userId, {
      likedPosts: arrayUnion(doc(db, `users/${ownerId}/posts/${postId}`)),
    });
  };

  // -- friends

  const handleFriendShip = async (userId, friendId, type) => {
    const friendDocRef = doc(db, `users/${friendId}`);
    const userDocRef = doc(db, `users/${userId}`);
    switch (type) {
      case "request":
        await updateUserDocument(userId, {
          requestedFriends: arrayUnion(friendDocRef),
        });
        await updateUserDocument(friendId, {
          pendingRequests: arrayUnion(userDocRef),
        });
        break;
      case "accept":
        await updateUserDocument(userId, {
          friends: arrayUnion(friendDocRef),
          pendingRequests: arrayRemove(doc(db, `users/${friendId}`)),
        });
        await updateUserDocument(friendId, {
          friends: arrayUnion(userDocRef),
          requestedFriends: arrayRemove(doc(db, `users/${userId}`)),
        });
        break;
      default:
        return;
    }
  };

  const getAllPendingRequests = async (userId, setPendingRequests) => {
    const userData = await getUserData(userId);
    if (userData.pendingRequests) {
      userData.pendingRequests.forEach(async (friend) => {
        const friendData = await getUserData(friend.id);
        const { displayName, photoURL } = friendData;
        setPendingRequests((prev) =>
          _.uniqBy(
            prev.concat({ displayName, photoURL, id: friendData.id }),
            "id"
          )
        );
      });
    }
  };

  const getAllFriends = async (userData, setFriends) => {
    if (userData.friends) {
      userData.friends.forEach(async (friend) => {
        const friendData = await getUserData(friend.id);
        const { displayName, photoURL } = friendData;
        setFriends((prev) =>
          _.uniqBy(
            prev.concat({ displayName, photoURL, id: friendData.id }),
            "id"
          )
        );
      });
    }
  };

  // -- users -- posts -- comments

  const createComment = async ({ ownerId, postId, comment, userId }) => {
    const commentsRef = collection(
      db,
      `users/${ownerId}/posts/${postId}/comments`
    );
    await addDoc(commentsRef, {
      text: comment,
      timestamp: serverTimestamp(),
      by: doc(db, `users/${userId}`),
    });
    const postDocRef = doc(db, `users/${ownerId}/posts`, `${postId}`);
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postDocRef);
      if (!postDoc.exists()) {
        throw new Error("POST NOT EXIST");
      }
      const newTotalComments = postDoc.data().totalComments + 1;
      transaction.update(postDocRef, { totalComments: newTotalComments });
    });
  };

  const getCommentByUserId = ({ ownerId, userId, postId }) => {
    const userDocRef = doc(db, `users/${userId}`);
    const q = query(
      collection(db, `users/${ownerId}/posts/${postId}/comments`),
      where("by", "==", userDocRef),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    return getDocumentsInQuery(q);
  };

  const getInitComments = ({ userId, postId, setComments, setLastVisible }) => {
    const q = query(
      collection(db, `users/${userId}/posts/${postId}/comments`),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    getAllCommentsInQuery(q, setComments, setLastVisible);
  };

  const getMoreComments = ({
    userId,
    postId,
    lastVisible,
    setComments,
    setLastVisible,
  }) => {
    const q = query(
      collection(db, `users/${userId}/posts/${postId}/comments`),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(5)
    );
    getAllCommentsInQuery(q, setComments, setLastVisible);
  };

  const getAllCommentsInQuery = async (q, setComments, setLastVisible) => {
    getDocumentsInQueryRT({ query: q, setDocs: setComments, setLastVisible });
  };

  // Cloud Storage

  const uploadFile = async (data) => {
    const { filePath, file } = data;
    const newFileRef = file && ref(storage, filePath);
    const fileSnapShot = file && (await uploadBytesResumable(newFileRef, file));
    const publicFileURL = file && (await getDownloadURL(newFileRef));
    return { fileSnapShot, publicFileURL };
  };

  return {
    setAuthStatePersistence,
    createUser,
    signIn,
    logOut,
    getUserData,
    getUserDataRT,
    getUserDataByRef,
    getUsersByName,
    createPost,
    getPost,
    getPostByRef,
    getInitUserPosts,
    getMoreUserPosts,
    updatePostSharedBy,
    updatePostLikes,
    handleFriendShip,
    getAllPendingRequests,
    getAllFriends,
    createComment,
    getCommentByUserId,
    getInitComments,
    getMoreComments,
    uploadFile,
    getAllPosts,
  };
})();
