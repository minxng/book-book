import { categories } from "@/app/constant";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import SideCategorise from "@/components/SideCategorise";
import {
  getBestSeller,
  getNewBooks,
  getRecommendBooks,
  getSearchKeyword,
} from "@/lib/api/aladin";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    keyword: string;
    categoryId: number;
    page: number;
  }>;
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
  const categoryName = categoryId
    ? categories.find((category) => String(category.id) === String(categoryId))
        ?.title
    : "전체";

  return (
    <section className="container-style mt-4 border-primary-200 border-t-1 sm:p-0 p-4">
      <div className="flex sm:mt-8 mt-0 sm:flex-row flex-col">
        <div className="basis-1/5">
          <SideCategorise categoryId={categoryId} />
        </div>
        <div className="basis-4/5">
          {type === "search" && (
            <p className="mb-8">
              <span className="font-bold text-primary-600">{keyword}</span> 검색
              결과 총 {books.totalResults}건
            </p>
          )}
          <p className="mb-8 font-bold text-lg sm:block hidden">
            {type === "bestSeller" && `${categoryName} 베스트셀러`}
            {type === "newBook" && "이달의 신작도서"}
            {type === "recommendBook" && "이달의 추천도서"}
          </p>
          <BookList books={books} />
          <Pagination
            currentPage={currentPage}
            totalResults={books.totalResults}
            currentType={type}
            currentCategory={categoryId}
            currentKeyword={keyword}
          />
        </div>
      </div>
    </section>
  );
}
