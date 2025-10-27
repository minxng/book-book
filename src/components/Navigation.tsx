"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOutUser } from "@/lib/api/firebase";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../public/logo.png";

export default function Navigation() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  useEffect(() => {
    if (!pathname.startsWith("/list/search")) {
      setKeyword("");
    }
  }, [pathname]);
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    router.push(`/list/search?keyword=${keyword}`);
  };
  const signOut = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      signOutUser();
      window.location.replace("/");
    }
  };
  return (
    <nav className="flex max-w-[1200px] w-full mx-auto my-0 px-4 sm:px-8 py-4  gap-3 sm:gap-8 items-center justify-between flex-wrap sm:flex-nowrap">
      <h1>
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={100} />
        </Link>
      </h1>
      <div className="border-emerald-800 border p-2 rounded-2xl flex items-center w-full sm:w-1/2 order-3 sm:order-2">
        <BiSearch size={24} className="text-primary" />
        <form onSubmit={handleOnSubmit} className="w-full">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="focus:outline-0 w-full px-2"
          />
        </form>
      </div>
      {user ? (
        <div className="flex items-center gap-4 order-2 sm:order-3">
          <Link
            href="/my-book/wishlist"
            className="flex items-center gap-2 cursor-pointer"
          >
            <BsPersonCircle size={30} className="text-primary" />
            {user.displayName}님
          </Link>
          <button className="cursor-pointer" onClick={signOut}>
            {" "}
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="flex items-center gap-2 cursor-pointer order-2 sm:order-3"
        >
          <BsPersonCircle size={30} className="text-primary" />
          로그인
        </Link>
      )}
    </nav>
  );
}
