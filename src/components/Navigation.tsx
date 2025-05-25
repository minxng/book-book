"use client";

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
  return (
    <nav className="flex max-w-[1200px] w-4/5 mx-auto my-0 py-4 gap-10 items-center justify-between">
      <h1>
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={100} />
        </Link>
      </h1>
      <div className="border-emerald-800 border-1 p-2 rounded-2xl flex items-center  w-1/2">
        <BiSearch size={24} className="text-primary" />
        <form action="" onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="focus:outline-0 w-full px-2"
          />
        </form>
      </div>
      <div className="flex items-center gap-2 cursor-pointer" onClick={login}>
        <BsPersonCircle size={30} className="text-primary" />
        로그인
      </div>
    </nav>
  );
}
