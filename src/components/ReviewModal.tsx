"use client";
import { useState } from "react";
import Modal from "./Modal";

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: string) => void;
}) {
  const [review, setReview] = useState("");
  const handleSave = () => {
    onSubmit(review);
    setReview("");
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">리뷰 작성</h2>
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
