"use client";

import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface PaginationProps {
  currentType: string;
  currentCategory: number;
  currentKeyword: string;
  currentPage: number;
  totalResults: number;
}

export default function Pagination({
  currentPage,
  totalResults,
  currentType,
  currentCategory,
  currentKeyword,
}: PaginationProps) {
  const makeQuery = (page: number) => {
    const query = new URLSearchParams();
    if (currentKeyword) query.set("keyword", currentKeyword);
    if (currentCategory) query.set("categoryId", String(currentCategory));
    query.set("page", String(page));
    return query;
  };
  const isMobile = window.innerWidth < 500;
  const groupCount = isMobile ? 5 : 10;
  const startPage = Math.floor((currentPage - 1) / groupCount) * groupCount + 1;
  const endPage = Math.min(
    startPage + groupCount - 1,
    Math.ceil(totalResults / groupCount)
  );
  const pagination = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  return (
    <div className="flex items-center gap-2 my-8 justify-center">
      {startPage > 1 && (
        <Link href={`/list/${currentType}?${makeQuery(startPage - 1)}`}>
          <GrFormPrevious className="text-primary" size={20} />
        </Link>
      )}
      {pagination.map((page) => {
        return (
          <Link key={page} href={`/list/${currentType}?${makeQuery(page)}`}>
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page && "bg-primary-300"
              }`}
            >
              {page}
            </span>
          </Link>
        );
      })}
      {endPage < totalResults / groupCount && (
        <Link href={`/list/${currentType}?${makeQuery(endPage + 1)}`}>
          <GrFormNext className="text-primary" size={20} />
        </Link>
      )}
    </div>
  );
}
