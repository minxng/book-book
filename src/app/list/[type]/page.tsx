import { categories } from "@/app/constant";
import BookList from "@/components/BookList";
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
  };
}

export default async function ListPage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const { keyword, categoryId } = await searchParams;

  let books;
  if (type === "bestSeller") {
    books = await getBestSeller(categoryId);
  } else if (type === "newBook") {
    books = await getNewBooks();
  } else if (type === "recommendBook") {
    books = await getRecommendBooks();
  } else if (type === "search" && keyword) {
    books = await getSearchKeyword(keyword);
  }
  return (
    <section className="w-4/5 max-w-[1200px] mx-auto mt-4 border-primary-200 border-t-1">
      <div className="flex mt-8 gap-8">
        <div className="basis-1/5">
          <p className="font-bold text-lg mb-3">분야별 베스트셀러</p>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="mb-2 hover:text-primary-600 text-sm"
              >
                <Link href={`/list/bestSeller?categoryId=${category.id}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-4/5">
          <p className="mb-8">
            <span className="font-bold text-primary-600">{keyword}</span> 검색
            결과 총 {books.totalResults}건
          </p>
          <BookList books={books} />
        </div>
      </div>
    </section>
  );
}
