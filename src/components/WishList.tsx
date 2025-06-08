"use client";
import { useAuth } from "@/hooks/useAuth";
import { getWishList } from "@/lib/api/firebase";
import { useEffect, useState } from "react";

type WishListItem = {
  id: string;
  title: string;
  cover: string;
};

export default function WishList() {
  const user = useAuth();
  const [wishList, setWishList] = useState<Record<string, WishListItem> | null>(
    null
  );
  useEffect(() => {
    if (user) {
      getWishList()
        .then((data) => {
          setWishList(data as Record<string, WishListItem> | null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  return <section>{JSON.stringify(wishList)}</section>;
}
