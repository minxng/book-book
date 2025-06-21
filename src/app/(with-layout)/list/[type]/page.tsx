import { categories } from "@/app/constant";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import {
  getBestSeller,
  getNewBooks,
  getRecommendBooks,
  getSearchKeyword,
} from "@/lib/api/aladin";
import Link from "next/link";

interface PageProps {
  params: {
    type: string;
  };
  searchParams: {
    keyword: string;
    categoryId: number;
    page: number;
  };
}

export default async function ListPage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const { keyword, categoryId, page } = await searchParams;
  const getBooks = async (page: number) => {
    if (type === "bestSeller") {
      return await getBestSeller(page, categoryId);
    } else if (type === "newBook") {
      return await getNewBooks(page);
    } else if (type === "recommendBook") {
      return await getRecommendBooks(page);
    } else if (type === "search" && keyword) {
      return await getSearchKeyword(page, keyword);
    }
    return null;
  };
  const currentPage = Number(page || 1);
  const books = await getBooks(currentPage);
  let categoryName = "전체";
  return (
    <section className="container-style mt-4 border-primary-200 border-t-1">
      <div className="flex mt-8">
        <div className="basis-1/5">
          <p className="font-bold text-lg mb-3">분야별 베스트셀러</p>
          <ul>
            {categories.map((category) => {
              const isSelected = String(category.id) === String(categoryId);
              if (isSelected) categoryName = category.title;
              return (
                <li
                  key={category.id}
                  className={`text-gray-800 mb-2 hover:text-primary-600 text-sm ${
                    isSelected && "text-primary-600 font-bold"
                  }`}
                >
                  <Link href={`/list/bestSeller?categoryId=${category.id}`}>
                    {category.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="basis-4/5">
          {type === "search" && (
            <p className="mb-8">
              <span className="font-bold text-primary-600">{keyword}</span> 검색
              결과 총 {books.totalResults}건
            </p>
          )}
          <p className="mb-8 font-bold text-lg">
            {type === "bestSeller" && `${categoryName} 베스트셀러`}
            {type === "newBook" && "이달의 신작도서"}
            {type === "recommendBook" && "이달의 추천도서"}
          </p>
          <BookList books={books} />
          <Pagination
            currentPage={currentPage}
            totalPages={books.totalResults}
            currentType={type}
            currentCategory={categoryId}
            currentKeyword={keyword}
          />
        </div>
      </div>
    </section>
  );
}
