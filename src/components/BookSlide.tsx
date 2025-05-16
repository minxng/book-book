"use client";

import Image from "next/image";
import Link from "next/link";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BookItem {
  itemId: string;
  title: string;
  cover: string;
  isbn13: string;
  bestRank?: string;
}

interface Book {
  books: {
    item: BookItem[];
  };
  title: string;
  type: string;
}

export default function BookSlide({ books, title, type }: Book) {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <section className="py-6">
      <Link href={`/list/${type}`}>
        <h2 className="text-2xl font-bold py-4 flex items-center gap-2">
          {title}
          <IoIosArrowForward />
        </h2>
      </Link>
      <Swiper
        loop={true}
        slidesPerView={5}
        spaceBetween={50}
        autoplay={{
          delay: 3000,
        }}
      >
        {books.item.map((book) => (
          <SwiperSlide key={book.itemId} className="relative">
            <Link href={`/book/${book.isbn13}`}>
              <div className="relative w-full aspect-[170/240]">
                <Image
                  src={book.cover.replace("coversum", "cover500")}
                  alt="book cover"
                  className="w-full h-full object-contain"
                  fill
                  sizes="true"
                />
              </div>
              <p className="text-ellipsis line-clamp-2 mt-4">
                {book.bestRank && (
                  <span className="px-2 py-1 mr-1 bg-amber-200 text-center rounded">
                    {book.bestRank}
                  </span>
                )}
                {book.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
