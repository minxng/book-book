"use client";

import ReviewList from "@/components/ReviewList";
import WishList from "@/components/WishList";
import { useState } from "react";
export default function MyBook() {
  const [currentTab, setCurrentTab] = useState("");
  return (
    <section className="container-style">
      <div className="flex gap-4">
        <p onClick={() => setCurrentTab("wish")}>위시리스트</p>
        <p onClick={() => setCurrentTab("review")}>리뷰 작성한 도서</p>
      </div>
      {currentTab === "wish" ? <WishList /> : <ReviewList />}
    </section>
  );
}
