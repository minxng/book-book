import { useAuth } from "@/hooks/useAuth";
import { subscribeToReviewList } from "@/lib/api/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
type CommentType = {
  createdAt: number;
  review: string;
};
type ReviewItem = {
  id: string;
  title: string;
  cover: string;
  review: string;
  rating: number;
  comments: CommentType[];
};
export default function ReviewList() {
  const user = useAuth();
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToReviewList((data) => {
      setReviewList(data);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  const deleteReviewItem = (bookId: string, commentId: string) => {
    deleteReview(bookId, commentId);
  };
  return (
    <ul className="mt-4">
      {reviewList &&
        reviewList.map((book) => (
          <li key={book.id} className="flex gap-4">
            <div>
              <Image src={book.cover} alt="cover" width={160} height={200} />
            </div>
            <div className="w-full">
              <p className="text-xl">{book.title}</p>
              <p className="flex items-center">
                {book.rating}
                <FaRegStar />
              </p>
              {Object.entries(book.comments).map(([commentKey, comment]) => (
                <div
                  className="bg-primary-200 rounded-xl p-4 w-full my-3 flex justify-between"
                  key={comment.createdAt}
                >
                  <p>{comment.review}</p>
                  <div>
                    <button className="p-3 rounded cursor-pointer">
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => deleteReviewItem(book.id, commentKey)}
                      className="p-3 rounded cursor-pointer"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
    </ul>
  );
}
