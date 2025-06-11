"use client";
import { useAuth } from "@/hooks/useAuth";
import { getWishList } from "@/lib/api/firebase";
import { useEffect, useState } from "react";

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
    if (user) {
      getWishList()
        .then((data) => {
          setWishList(data as WishListItem[]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  return (
    <ul>
      {wishList.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}
