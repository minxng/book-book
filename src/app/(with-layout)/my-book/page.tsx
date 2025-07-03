"use client";

import ReviewList from "@/components/ReviewList";
import WishList from "@/components/WishList";
import { useState } from "react";
export default function MyBook() {
  const [currentTab, setCurrentTab] = useState("wish");
  return (
    <section className="container-style">
      <ul className="flex text-center px-4">
        <li
          className={`${
            currentTab === "wish"
              ? "bg-primary-500 text-white"
              : "bg-white text-black border-1 border-primary border-dashed"
          }  px-8 py-2 cursor-pointer rounded-t-2xl`}
          onClick={() => setCurrentTab("wish")}
        >
          위시리스트
        </li>
        <li
          className={`${
            currentTab === "review"
              ? "bg-primary-500 text-white"
              : "bg-white text-black border-1 border-primary border-dashed"
          }  px-8 py-2 cursor-pointer rounded-t-2xl`}
          onClick={() => setCurrentTab("review")}
        >
          리뷰 작성한 도서
        </li>
      </ul>
      {currentTab === "wish" ? <WishList /> : <ReviewList />}
    </section>
  );
}
