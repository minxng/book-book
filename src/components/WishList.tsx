"use client";
import { useAuth } from "@/hooks/useAuth";
import { removeWishListItem, subscribeToWishList } from "@/lib/api/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import ReviewButton from "./ReviewButton";

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
};

export default function WishList() {
  const user = useAuth();
  const [wishList, setWishList] = useState<WishListItem[]>([]);
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToWishList((data) => {
      setWishList(data);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  const openLink = (link: string) => {
    window.open(link);
  };
  const deleteItem = (id: string) => {
    removeWishListItem(id);
  };
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 px-4 gap-4 md:gap-8">
      {wishList.map((book) => (
        <li key={book.id} className="flex flex-col gap-2">
          <div className="relative w-full aspect-[2/3] group">
            <Image
              src={book.cover}
              alt="표지"
              fill
              sizes=""
              className="object-contain group-hover:brightness-50"
            />
            <button
              onClick={() => openLink(book.link)}
              className="absolute top-1/2 left-1/2 -translate-1/2 hidden group-hover:flex items-center gap-2 p-2 rounded cursor-pointer bg-white text-sm"
            >
              상세 보기
            </button>
          </div>
          <p className="overflow-ellipsis line-clamp-1">{book.title}</p>
          <div className="flex gap-2">
            <ReviewButton book={book} />
            <button
              onClick={() => deleteItem(book.id)}
              className="border-1 border-primary-200 p-3 rounded cursor-pointer"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
