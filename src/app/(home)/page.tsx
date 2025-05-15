import Banner from "@/components/Banner";
import BookSlide from "@/components/BookSlide";

async function getBooks() {
  const response = await fetch(
    "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbskmnjng2132001&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101"
  );
  const json = await response.json();
  console.log("?");
  return json;
}

export default async function Home() {
  const books = await getBooks();
  return (
    <div className="w-4/5 mx-auto my-0">
      <Banner />
      <p>{JSON.stringify(books)}</p>
      <BookSlide />
    </div>
  );
}
