import Banner from "@/components/Banner";
import BookSlide from "@/components/BookSlide";

async function getBestSeller() {
  const response = await fetch(
    "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbskmnjng2132001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101"
  );
  const json = await response.json();
  return json;
}

async function getNewBooks() {
  const response = await fetch(
    "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbskmnjng2132001&QueryType=ItemNewSpecial&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101"
  );
  const json = await response.json();
  return json;
}

export default async function Home() {
  const bestseller = await getBestSeller();
  const newBooks = await getNewBooks();
  return (
    <div className="w-4/5 max-w-[1200px] mx-auto my-0">
      <Banner />
      <BookSlide books={bestseller} title="베스트셀러 TOP 10" />
      <BookSlide books={newBooks} title="이달의 신간도서" />
    </div>
  );
}
