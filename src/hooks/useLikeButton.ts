import { useState, useEffect } from "react";
import { useLike } from "./useLikeResult";
import { UseLikeButtonProps, UseLikeButtonResult } from "./types";
import { useHandleNotLoggedIn } from "./useHandleNotLoggedIn";

export const useLikeButton = ({
  postId,
  userId,
}: UseLikeButtonProps): UseLikeButtonResult => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const { likePost, getLikeCount, isLiked } = useLike();
  const [loading, setLoading] = useState<boolean>(true);
  const handleNotLoggedIn = useHandleNotLoggedIn();

  useEffect(() => {
    const fetchLikeData = async () => {
      if (postId) {
        try {
          const [likedStatus, likeCount] = await Promise.all([
            userId ? isLiked(postId, userId) : false,
            getLikeCount(postId),
          ]);
          setLiked(likedStatus);
          setLikeCount(likeCount);
        } catch (err) {
          console.error("Error fetching like data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLikeData();
  }, [postId, userId, isLiked, getLikeCount]);

  const handleLikeClick = async () => {
    if (!userId) {
      handleNotLoggedIn();
      return;
    }
    if (postId && userId) {
      try {
        await likePost(postId, userId);
        const updatedLikeCount = await getLikeCount(postId);
        setLikeCount(updatedLikeCount);
        const updatedLikedStatus = await isLiked(postId, userId);
        setLiked(updatedLikedStatus);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { likeCount, liked, loading, handleLikeClick };
};
