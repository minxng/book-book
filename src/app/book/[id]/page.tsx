import { getBookDetail } from "@/lib/api/aladin";
import Image from "next/image";

export default async function BookDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const book = await getBookDetail(id);
  return (
    <section className="w-4/5 max-w-[1200px] mx-auto mt-8">
      <h3 className="text-xl mb-4">{book.title}</h3>
      <div className="flex">
        <Image
          src={book.cover.replace("coversum", "cover500")}
          alt="book cover"
          width={300}
          height={500}
        />
        <div className="flex flex-col w-1/2">
          <p>{book.description}</p>
          <span>{book.subTitle}</span>
          <span>{book.author}</span>
        </div>
      </div>
    </section>
  );
}
