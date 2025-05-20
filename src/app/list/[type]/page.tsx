import { categories } from "@/app/constant";
import List from "@/components/List";
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
    <section className="w-4/5 max-w-[1200px] mx-auto">
      <div className="flex mt-8">
        <div className="basis-1/5">
          <p>분야별 베스트셀러 확인</p>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/list/bestSeller?categoryId=${category.id}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <List books={books} />
      </div>
    </section>
  );
}
