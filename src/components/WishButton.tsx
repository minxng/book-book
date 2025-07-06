"use client";
import { addWishList } from "@/lib/api/firebase";
import { FaHeart } from "react-icons/fa6";
interface BookProps {
  book: {
    itemId: string;
    title: string;
    cover: string;
    link: string;
  };
}
export default function WishButton({ book }: BookProps) {
  const handleOnClick = async () => {
    const cover = book.cover.replace("coversum", "cover500");
    const result = await addWishList(book.itemId, book.title, cover, book.link);
    if (result.success) {
      alert("성공");
    } else {
      alert("실패 다시 시도해주세요");
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="w-full flex justify-center items-center gap-1 whitespace-nowrap p-2 text-sm rounded cursor-pointer bg-blue-50 hover:bg-blue-100"
    >
      찜하기 <FaHeart color="orange" />
    </button>
  );
}
