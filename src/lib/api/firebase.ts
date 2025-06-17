import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export const auth = getAuth();
const getUserId = () => auth.currentUser?.uid;

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.code };
    }
    return { success: false, error: "unknown-error" };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch {
    return { success: false };
  }
};

export const signOutUser = () => {
  signOut(auth);
};

export const addWishList = async (
  id: string,
  title: string,
  cover: string,
  link: string
) => {
  const userId = getUserId();
  try {
    await set(ref(db, `users/${userId}/wishList/${id}`), {
      title,
      id,
      cover,
      link,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
};

export const subscribeToWishList = (
  callback: (items: WishListItem[]) => void
) => {
  const userId = getUserId();
  if (!userId) return () => {};
  const wishListRef = ref(db, `users/${userId}/wishList`);
  onValue(wishListRef, (snapshot) => {
    const data = snapshot.val();
    const list = data ? Object.values(data) : [];
    callback(list as WishListItem[]);
  });
  return () => off(wishListRef);
};

export const removeWishListItem = (id: string) => {
  const userId = getUserId();
  remove(ref(db, `users/${userId}/wishList/${id}`));
};

export const writeReview = async (
  id: string,
  title: string,
  cover: string,
  review: string,
  rating: number
) => {
  const userId = getUserId();
  const reviewRef = ref(db, `users/${userId}/reviews/${id}`);
  const snapshot = await get(reviewRef);
  const exists = snapshot.exists();
  if (!exists) {
    await set(reviewRef, {
      title,
      cover,
      rating,
      comments: {},
    });
  }
  if (rating) {
    set(ref(db, `users/${userId}/reviews/${id}/rating`), rating);
  }
  if (review) {
    push(ref(db, `users/${userId}/reviews/${id}/comments`), {
      review,
      createdAt: Date.now(),
    });
  }
};
