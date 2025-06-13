"use client";

import { addWishList } from "@/lib/api/firebase";

interface BookProps {
  book: {
    itemId: string;
    title: string;
    cover: string;
    link: string;
  };
}

export default function WishButton({ book }: BookProps) {
  console.log(book, "book");
  const handleOnClick = async () => {
    const result = await addWishList(
      book.itemId,
      book.title,
      book.cover,
      book.link
    );
    if (result.success) {
      alert("성공");
    } else {
      alert("실패 다시 시도해주세요");
    }
  };
  return (
    <div onClick={handleOnClick} className="bg-amber-300 cursor-pointer">
      <button>찜하기</button>
    </div>
  );
}
