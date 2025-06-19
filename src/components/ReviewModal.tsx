"use client";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import Modal from "./Modal";

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
    if (isOpen && existingReview) {
      setReview(existingReview.review ?? "");
      setRating(existingReview.rating ?? 0);
    }
    if (!isOpen) {
      setReview("");
      setRating(0);
    }
  }, [isOpen, existingReview]);
  const handleSave = () => {
    const id = book.id;
    const title = book.title;
    const cover = book.cover;
    onSubmit({ id, title, cover, review, rating });
    setReview("");
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">{book.title}</h2>
      <FaRegStar size={40} />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <textarea
        className="w-full border p-2 rounded resize-none h-24"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="border px-4 py-2 rounded">
          취소
        </button>
        <button
          onClick={handleSave}
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          저장
        </button>
      </div>
    </Modal>
  );
}
