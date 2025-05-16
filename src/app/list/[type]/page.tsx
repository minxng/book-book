import { getBestSeller, getNewBooks } from "@/app/(home)/page";
import List from "@/components/List";

// interface BookItem {
//   itemId: string;
//   title: string;
// }

interface PageProps {
  params: {
    type: string;
  };
  searchParams: {
    keyword: string;
  };
}

async function getSearchKeyword(keyword: string) {
  const response = await fetch(
    `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbskmnjng2132001&Query=${keyword}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&Cover=Big&output=JS&Version=20131101`
  );
  const json = await response.json();
  return json;
}

export default async function ListPage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const keyword = await searchParams.keyword;
  const categories = ["a", "b"];
  console.log(type, keyword, "page component");
  let books;
  if (type === "bestSeller") {
    books = await getBestSeller();
  } else if (type === "newBook") {
    books = await getNewBooks();
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
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
        <List books={books} />
      </div>
    </section>
  );
}
