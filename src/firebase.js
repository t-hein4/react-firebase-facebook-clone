import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjIOys2CMwELF8_TZ7CTDYmG6uKLkDgXo",
  authDomain: "fb-clone-60c0a.firebaseapp.com",
  projectId: "fb-clone-60c0a",
  storageBucket: "fb-clone-60c0a.appspot.com",
  messagingSenderId: "949287661871",
  appId: "1:949287661871:web:c8a1ed3759c52f71de31da",
  measurementId: "G-0JVCQTZDPK",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
