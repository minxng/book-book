"use client";
import { useEffect, useState } from "react";
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
  // const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (isOpen && existingReview) {
      setReview(existingReview.review ?? "");
      setRating(existingReview.rating ?? 0);
      console.log(existingReview, "//");
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
      <Rating value={rating} readonly={false} onChange={(v) => setRating(v)} />
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
