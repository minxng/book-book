import InfoButton from "@/components/InfoButton";
import ReviewButton from "@/components/ReviewButton";
import WishButton from "@/components/WishButton";
import { getBookDetail } from "@/lib/api/aladin";
import he from "he";
import Image from "next/image";

export default async function BookDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const book = await getBookDetail(id);
  return (
    <section className="container-style p-8">
      <div className="flex gap-10 sm:flex-row flex-col items-center sm:items-start">
        <div className="w-[250px] max-w-64 sm:w-[300px]">
          <Image
            src={book.cover.replace("coversum", "cover500")}
            alt="book cover"
            width={300}
            height={300}
            className="w-full"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 gap-2">
          <h3 className="text-xl">
            {he.decode(book.title)}{" "}
            <span className="text-sm ml-2">{book.author}</span>
          </h3>
          <p>{he.decode(book.description)}</p>
          <span>{book.subTitle}</span>

          <div className="flex gap-2">
            <WishButton book={book} />
            <ReviewButton book={{ ...book, id: book.itemId }} />
            <InfoButton link={book.link} />
          </div>
        </div>
      </div>
    </section>
  );
}
