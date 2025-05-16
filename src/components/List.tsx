import Image from "next/image";

interface BookItem {
  itemId: string;
  title: string;
  cover: string;
  categoryName: string;
  description: string;
  author: string;
  pubDate: string;
  publisher: string;
  bestRank: number;
}
interface BooksProps {
  books: {
    item: BookItem[];
  };
}

export default function List({ books }: BooksProps) {
  return (
    <ul className="basis-4/5">
      {books.item.map((book) => (
        <li key={book.itemId} className="flex gap-8 mb-12">
          <div className="basis-1/5">
            <Image src={book.cover} alt="표지지" width={200} height={200} />
          </div>
          <div className="basis-4/5">
            <p>{book.bestRank}</p>
            <p>{book.categoryName}</p>
            <p className="text-xl font-bold">{book.title}</p>
            <p>
              {book.author} | {book.publisher} | {book.pubDate}
            </p>
            <p>{book.description}</p>
            <p>
              <button>찜하기</button>
              <button>구매하러 가기</button>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
