"use client";
import { useAuth } from "@/hooks/useAuth";
import { removeWishListItem, subscribeToWishList } from "@/lib/api/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
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
    <ul className="grid grid-cols-5 gap-8">
      {wishList.map((book) => (
        <li key={book.id}>
          <div className="relative w-full aspect-[2/3] group">
            <Image
              src={book.cover}
              alt="표지"
              fill
              className="object-contain group-hover:opacity-40"
            />
          </div>
          <p className="overflow-ellipsis line-clamp-1">{book.title}</p>
          <div className="flex">
            <ReviewButton book={book} />
            <button
              onClick={() => openLink(book.link)}
              className="flex items-center gap-2 border-1 border-primary-200 p-3 rounded cursor-pointer"
            >
              구매
              <FiExternalLink />
            </button>
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
