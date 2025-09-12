"use client";
import { addWishList } from "@/lib/api/firebase";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import WishConfirmModal from "./WishConfirmModal";
interface BookProps {
  book: {
    itemId: string;
    title: string;
    cover: string;
    link: string;
    isbn13: string;
  };
}
export default function WishButton({ book }: BookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = async () => {
    const cover = book.cover.replace("coversum", "cover500");
    const result = await addWishList(
      book.itemId,
      book.title,
      cover,
      book.link,
      book.isbn13
    );
    if (result.success) {
      setIsOpen(true);
    } else {
      alert("실패 다시 시도해주세요");
    }
  };
  return (
    <>
      <WishConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <button
        onClick={handleOnClick}
        className="w-full flex justify-center items-center gap-1 whitespace-nowrap p-2 text-sm rounded cursor-pointer bg-blue-50 hover:bg-blue-100"
      >
        찜하기 <FaHeart color="orange" />
      </button>
    </>
  );
}
