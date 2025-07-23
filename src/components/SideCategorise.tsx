"use client";

import { categories } from "@/app/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SideCategorise({ categoryId }: { categoryId: number }) {
  const router = useRouter();
  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/list/bestSeller?categoryId=${e.target.value}`);
  };
  return (
    <div className="flex sm:block items-center">
      <p className="font-bold text-lg sm:mb-3">분야별 베스트셀러</p>
      <select onChange={selectCategory} className="sm:hidden">
        <option value="">선택</option>
        {categories.map((category) => {
          return (
            <option
              value={category.id}
              key={category.id}
              className={`text-gray-800 mb-2 text-sm `}
            >
              {category.title}
            </option>
          );
        })}
      </select>
      <ul className="hidden sm:block">
        {categories.map((category) => {
          const isSelected = String(category.id) === String(categoryId);
          return (
            <li
              key={category.id}
              className={`text-gray-800 mb-2 hover:text-primary-600 text-sm ${
                isSelected && "text-primary-600 font-bold"
              }`}
            >
              <Link href={`/list/bestSeller?categoryId=${category.id}`}>
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
