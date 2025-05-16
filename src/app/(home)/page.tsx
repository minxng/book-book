import Banner from "@/components/Banner";
import BookSlide from "@/components/BookSlide";
import { getBestSeller, getNewBooks } from "@/lib/api/aladin";

export default async function Home() {
  const bestseller = await getBestSeller();
  const newBooks = await getNewBooks();
  return (
    <div className="w-4/5 max-w-[1200px] mx-auto my-0">
      <Banner />
      <BookSlide
        books={bestseller}
        title="베스트셀러 TOP 10"
        type="bestSeller"
      />
      <BookSlide books={newBooks} title="이달의 신간도서" type="newBook" />
    </div>
  );
}
