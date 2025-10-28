"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Tabs() {
  const pathname = usePathname();
  return (
    <section className="mt-4 sm:mt-8 ">
      <ul className="flex text-center px-4 gap-2">
        <Link href="/my-book/wishlist">
          <li
            className={`${
              pathname === "/my-book/wishlist"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-black"
            } px-6 sm:px-8 py-2 cursor-pointer rounded-t-2xl`}
          >
            위시리스트
          </li>
        </Link>
        <Link href="/my-book/review">
          <li
            className={`${
              pathname === "/my-book/review"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-black"
            }  px-6 sm:px-8 py-2 cursor-pointer rounded-t-2xl`}
          >
            리뷰 작성한 도서
          </li>
        </Link>
      </ul>
    </section>
  );
}
