"use client";

import { FaExternalLinkAlt } from "react-icons/fa";

export default function InfoButton({ link }: { link: string }) {
  const openLink = (link: string) => {
    window.open(link);
  };
  return (
    <button
      onClick={() => openLink(link)}
      className="w-full flex justify-center items-center gap-1 whitespace-nowrap p-2 text-sm rounded cursor-pointer bg-blue-50 hover:bg-blue-100"
    >
      상세보기 <FaExternalLinkAlt color="orange" />
    </button>
  );
}
