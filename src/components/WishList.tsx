"use client";
import { useAuth } from "@/hooks/useAuth";
import { removeWishListItem, subscribeToWishList } from "@/lib/api/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

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
    <ul className="flex flex-wrap">
      {wishList.map((book) => (
        <li key={book.id} className="w-1/5">
          <Image
            src={book.cover.replace("coversum", "cover500")}
            alt="표지"
            width={200}
            height={200}
          />
          {book.title}
          <div className="flex">
            <button className="flex items-center gap-2 border-1 border-primary-200 p-3 rounded">
              리뷰 작성
              <FaPencilAlt />
            </button>
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
