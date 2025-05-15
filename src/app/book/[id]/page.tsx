import Image from "next/image";

async function getBookDetail(id: string) {
  const response = await fetch(
    `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbskmnjng2132001&itemIdType=isbn13&ItemId=${id}&output=JS&Version=20131101&OptResult=ebookList,usedList,reviewList`
  );
  const json = await response.json();
  return json.item[0];
}

export default async function BookDetail({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBookDetail(params.id);
  return (
    <section className="w-4/5 max-w-[1200px] mx-auto flex">
      <div className="relative aspect-auto">
        <Image
          src={book.cover.replace("coversum", "cover500")}
          alt="book cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col w-1/2">
        <h4>{book.title}</h4>
        <p>{book.description}</p>
        <span>{book.subTitle}</span>
        <span>{book.author}</span>
      </div>
    </section>
  );
}
