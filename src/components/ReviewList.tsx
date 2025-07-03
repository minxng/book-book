import { useAuth } from "@/hooks/useAuth";
import {
  deleteReview,
  subscribeToReviewList,
  updateReview,
  writeReview,
} from "@/lib/api/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

interface CommentType {
  createdAt: number;
  review: string;
}

interface ReviewItem {
  id: string;
  title: string;
  cover: string;
  review: string;
  rating: number;
  comments?: {
    [key: string]: CommentType;
  };
}

export default function ReviewList() {
  const user = useAuth();
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<ReviewItem | null>(null);
  const [selectedReview, setSelectedReview] = useState({
    review: "",
    rating: 0,
  });
  const [commentId, setCommentId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToReviewList((data) => {
      setReviewList(data);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  const updateReviewItem = ({
    id,
    title,
    cover,
    review,
    rating,
  }: {
    id: string;
    title: string;
    cover: string;
    review: string;
    rating: number;
  }) => {
    if (isUpdate)
      return updateReview({ bookId: id, commentId, review, rating });
    writeReview({ id, title, cover, review, rating });
  };

  const openReviewModal = (
    book: ReviewItem,
    selectedReview?: { review: string; rating: number },
    commentId?: string
  ) => {
    if (commentId && selectedReview) {
      setCommentId(commentId);
      setSelectedReview({
        review: selectedReview.review,
        rating: selectedReview.rating,
      });
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
    setSelectedBook(book);
    setIsOpen(true);
  };
  const deleteReviewItem = (bookId: string, commentId: string) => {
    deleteReview(bookId, commentId);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedBook(null);
    setSelectedReview({ review: "", rating: 0 });
    setCommentId("");
  };
  return (
    <>
      {selectedBook && (
        <ReviewModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onSubmit={updateReviewItem}
          book={selectedBook}
          existingReview={selectedReview}
        />
      )}
      <ul className="mt-4 px-4">
        {reviewList &&
          reviewList.map((book) => (
            <li
              key={book.id}
              className="grid grid-cols-[max-content_1fr] gap-4 py-6 first:pt-0 border-b-1 border-gray-200 justify-center"
            >
              <div className="sm:w-[200px] w-[120px] row-start-1 row-end-3 col-start-1 col-end-2">
                <Image
                  src={book.cover}
                  alt="cover"
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between row-start-1 row-end-2 col-start-2 col-end-3">
                <div>
                  <p className="text-xl">{book.title}</p>
                  <p className="flex items-center">
                    {book.rating}
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                  </p>
                </div>
                <button
                  onClick={() => openReviewModal(book)}
                  className="p-3 h-13 rounded cursor-pointer bg-amber-100 hover:bg-amber-200"
                >
                  메모 작성
                </button>
              </div>
              <ul className="col-start-1 col-end-3 sm:col-start-2">
                {book.comments &&
                  Object.entries(book.comments).map(([commentKey, comment]) => (
                    <li
                      className="bg-primary-200 rounded-xl p-4 w-full my-3 flex justify-between"
                      key={comment.createdAt}
                    >
                      <p>{comment.review}</p>
                      <div className="whitespace-nowrap">
                        <button
                          onClick={() =>
                            openReviewModal(
                              book,
                              { review: comment.review, rating: book.rating },
                              commentKey
                            )
                          }
                          className="p-3 rounded cursor-pointer"
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          onClick={() => deleteReviewItem(book.id, commentKey)}
                          className="p-3 rounded cursor-pointer"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
