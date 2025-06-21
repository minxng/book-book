"use client";
import { FaPencilAlt } from "react-icons/fa";
export default function ReviewButton({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) {
  return (
    <button
      onClick={handleOnClick}
      className="flex items-center justify-center gap-1 whitespace-nowrap p-2 text-sm rounded cursor-pointer bg-blue-50 hover:bg-blue-100"
    >
      리뷰쓰기 <FaPencilAlt color="orange" />
    </button>
  );
}
