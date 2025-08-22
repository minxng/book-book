"use client";
import ReviewButton from "@/components/ReviewButton";
import { useAuth } from "@/hooks/useAuth";
import { removeWishListItem, subscribeToWishList } from "@/lib/api/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
  isbn13?: string;
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
  const deleteItem = (id: string) => {
    removeWishListItem(id);
  };
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 px-4 gap-4 md:gap-8">
      {wishList.map((book) => (
        <li key={book.id} className="flex flex-col gap-2">
          <div className="relative w-full aspect-[2/3]">
            <Link href={`/book/${book.isbn13}`}>
              <Image
                src={book.cover}
                alt="표지"
                fill
                sizes=""
                className="object-contain"
              />
            </Link>
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
