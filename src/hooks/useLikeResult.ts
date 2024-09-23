import { useState } from "react";
import { db } from "../firebase/config";
import {
  doc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { UseLikeResult } from "./types";

export const useLike = (): UseLikeResult => {
  const [error, setError] = useState<string | null>(null);

  const likePost = async (postId: string, userId: string): Promise<void> => {
    if (!validateInputs(postId, userId)) return;

    try {
      const postRef = doc(db, "posts", postId);

      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) throw new Error("Post does not exist");

        const postData = postDoc.data();
        const hasLiked = postData?.likes?.includes(userId) ?? false;

        transaction.update(postRef, {
          likes: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
          likeCount: increment(hasLiked ? -1 : 1),
        });
      });
    } catch (err) {
      handleError("Error updating like. Please try again.", err);
    }
  };

  const getLikeInfo = async (
    postId: string,
    userId: string,
  ): Promise<{ isLiked: boolean; likeCount: number }> => {
    if (!validateInputs(postId, userId))
      return { isLiked: false, likeCount: 0 };

    try {
      const postData = await fetchPostData(postId);
      return {
        isLiked: postData?.likes?.includes(userId) ?? false,
        likeCount: postData?.likeCount ?? 0,
      };
    } catch (err) {
      handleError("Error fetching like information. Please try again.", err);
      return { isLiked: false, likeCount: 0 };
    }
  };

  const validateInputs = (postId: string, userId?: string): boolean => {
    if (!postId || (userId !== undefined && !userId)) {
      setError("postId or userId is missing");
      return false;
    }
    return true;
  };

  const fetchPostData = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    return postDoc.data();
  };

  const handleError = (message: string, err: unknown) => {
    setError(message);
    console.error(message, err);
  };

  return {
    likePost,
    error,
    getLikeInfo,
  };
};
