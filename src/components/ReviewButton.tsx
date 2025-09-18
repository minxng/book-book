"use client";
import { useAuth } from "@/hooks/useAuth";
import { writeReview } from "@/lib/api/firebase";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

type ReviewItem = {
  id: string;
  title: string;
  cover: string;
  review: string;
  rating: number;
};

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
};
export default function ReviewButton({ book }: { book: WishListItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<WishListItem | null>(null);
  const { user } = useAuth();
  console.log(user);
  const openReviewModal = (book: WishListItem) => {
    if (!user) return alert("로그인 후 이용해주세요.");
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const handleReviewSubmit = ({
    id,
    title,
    cover,
    review,
    rating,
  }: ReviewItem) => {
    writeReview({
      id,
      title,
      cover,
      review: review ?? "",
      rating: rating ?? 0,
    });
  };
  return (
    <>
      {selectedBook && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit}
          book={selectedBook}
        />
      )}
      <button
        onClick={() => openReviewModal(book)}
        className="flex items-center justify-center gap-1 w-full whitespace-nowrap p-2 text-sm rounded cursor-pointer bg-blue-50 hover:bg-blue-100"
      >
        리뷰쓰기 <FaPencilAlt color="orange" />
      </button>
    </>
  );
}
