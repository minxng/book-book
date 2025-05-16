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
