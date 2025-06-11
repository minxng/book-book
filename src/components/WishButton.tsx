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
  const handleOnClick = () => {
    addWishList(book.itemId, book.title, book.cover, book.link);
  };
  return (
    <div onClick={handleOnClick} className="bg-amber-300 cursor-pointer">
      <button>찜하기</button>
    </div>
  );
}
