"use client";
import Link from "next/link";
import Modal from "./Modal";

export default function WishConfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-72">
        <h2 className="text-lg font-semibold text-center mb-4">
          💚 찜 완료 💚
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          책이 위시리스트에 담겼습니다.
          <br />
          지금 확인하시겠습니까?
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            닫기
          </button>
          <Link
            href={"/my-book/wishlist"}
            className="flex-1 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 text-nowrap"
          >
            위시리스트로 이동
          </Link>
        </div>
      </div>
    </Modal>
  );
}
