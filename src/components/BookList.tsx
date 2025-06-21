"use client";

import { writeReview } from "@/lib/api/firebase";
import he from "he";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import WishButton from "./WishButton";

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
  isbn13: number;
  bookId: string;
  link: string;
}
interface BooksProps {
  books: {
    item: BookItem[];
  };
}

type WishListItem = {
  id: string;
  title: string;
  cover: string;
  link: string;
};
type ReviewItem = {
  id: string;
  title: string;
  cover: string;
  review: string;
  rating: number;
};

export default function BookList({ books }: BooksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<WishListItem | null>(null);
  const handleReviewSubmit = ({
    id,
    title,
    cover,
    review,
    rating,
  }: ReviewItem) => {
    writeReview({ id, title, cover, review, rating });
  };
  const openReviewModal = (book: WishListItem) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  return (
    <>
      {selectedBook && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit}
          book={selectedBook}
        />
      )}
      <ul>
        {books.item.map((book) => (
          <li
            key={book.itemId}
            className="flex gap-8  border-b-primary-200 border-b py-8 first:pt-0"
          >
            <Link href={`/book/${book.isbn13}`}>
              <div className="basis-1/5">
                <Image src={book.cover} alt="표지지" width={120} height={200} />
              </div>
            </Link>
            <div className="basis-4/5 flex flex-col gap-2">
              <p className="min-w-5 text-sm bg-primary w-fit text-center rounded text-white">
                {book.bestRank}
              </p>
              <Link href={`/book/${book.isbn13}`}>
                <p className="text-xl font-bold">{he.decode(book.title)}</p>
              </Link>
              <p className="text-sm">
                {he.decode(book.author)} | {book.publisher} | {book.pubDate}
              </p>
              <p>{he.decode(book.description)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <WishButton book={book} />
              <ReviewButton
                handleOnClick={() =>
                  openReviewModal({
                    id: book.itemId,
                    title: book.title,
                    cover: book.cover,
                    link: book.link,
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
