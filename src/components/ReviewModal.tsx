"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Rating from "./Rating";

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
};

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  book,
  existingReview,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({ id, title, cover, review, rating }: ReviewItem) => void;
  book: WishListItem | ReviewItem;
  comment?: string;
  existingReview?: { review: string; rating: number };
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    handleResizeHeight();
  }, [review]);

  useEffect(() => {
    if (isOpen && existingReview) {
      setReview(existingReview.review ?? "");
      setRating(existingReview.rating ?? 0);
    }
    if (!isOpen) {
      setReview("");
      setRating(0);
    }
  }, [isOpen, existingReview]);
  const router = useRouter();
  const handleSave = () => {
    const id = book.id;
    const title = book.title;
    const cover = book.cover;
    onSubmit({ id, title, cover, review, rating });
    setReview("");
    onClose();
    router.push("/my-book/review");
  };

  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 w-80 sm:min-w-96 p-2">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
          {book.title}
        </h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">평점을 선택해주세요</label>
          <Rating
            value={rating}
            readonly={false}
            onChange={(v) => setRating(v)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">리뷰</label>
          <textarea
            ref={textarea}
            rows={3}
            className="w-full p-3 rounded-xl border border-primary-300 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 max-h-96 min-h-28"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="리뷰를 작성해주세요..."
          />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 cursor-pointer"
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
