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
  update,
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
  link: string,
  isbn13: string
) => {
  const userId = getUserId();
  try {
    await set(ref(db, `users/${userId}/wishList/${id}`), {
      title,
      id,
      cover,
      link,
      isbn13,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};
interface CommentType {
  createdAt: number;
  review: string;
}

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
};

type ReviewItem = {
  id: string;
  title: string;
  cover: string;
  review: string;
  rating: number;
  comments?: {
    [key: string]: CommentType;
  };
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

export const subscribeToReviewList = (
  callback: (items: ReviewItem[]) => void
) => {
  const userId = getUserId();
  if (!userId) return () => {};
  const reviewListRef = ref(db, `users/${userId}/reviews`);
  onValue(reviewListRef, (snapshot) => {
    const data = snapshot.val();
    const list = data ? Object.values(data) : [];
    callback(list as ReviewItem[]);
  });
  return () => off(reviewListRef);
};

export const writeReview = async ({
  id,
  title,
  cover,
  review,
  rating,
}: ReviewItem) => {
  const userId = getUserId();
  const reviewRef = ref(db, `users/${userId}/reviews/${id}`);
  const snapshot = await get(reviewRef);
  const exists = snapshot.exists();

  if (!exists) {
    await set(reviewRef, {
      id,
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

export const updateReview = ({
  bookId,
  commentId,
  review,
  rating,
}: {
  bookId: string;
  commentId: string;
  review: string;
  rating: number;
}) => {
  const userId = getUserId();
  if (rating) {
    update(ref(db, `users/${userId}/reviews/${bookId}`), { rating: rating });
  }
  update(ref(db, `users/${userId}/reviews/${bookId}/comments/${commentId}`), {
    review,
    createdAt: Date.now(),
  });
};

export const deleteReview = (bookId: string, commentId: string) => {
  const userId = getUserId();
  remove(ref(db, `users/${userId}/reviews/${bookId}/comments/${commentId}`));
};

export const deleteReviewBook = (bookId: string) => {
  const userId = getUserId();
  remove(ref(db, `users/${userId}/reviews/${bookId}`));
};
