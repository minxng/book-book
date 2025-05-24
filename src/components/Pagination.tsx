"use client";

import Link from "next/link";

interface PaginationProps {
  pagination: number[];
  currentType: string;
  currentCategory: number;
  currentKeyword: string;
}

export default function Pagination({
  pagination,
  currentType,
  currentCategory,
  currentKeyword,
}: PaginationProps) {
  return (
    <div>
      {pagination.map((page) => {
        const query = new URLSearchParams();
        query.set("page", String(page));
        if (currentKeyword) query.set("keyword", currentKeyword);
        if (currentCategory) query.set("categoryId", String(currentCategory));
        return (
          <Link key={page} href={`/list/${currentType}?${query.toString()}`}>
            {page}
          </Link>
        );
      })}
    </div>
  );
}
