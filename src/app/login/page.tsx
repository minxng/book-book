"use client";
import Input from "@/components/Input";
import { signIn } from "@/lib/api/firebase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(email, password);
  };
  return (
    <section className="w-96 mx-auto">
      <Image src={logo} alt="logo" width={300} className="mx-auto p-16" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          onChange={setEmail}
          placeholder="이메일 주소를 입력해주세요"
        />
        <Input
          type="password"
          onChange={setPassword}
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          type="submit"
          className="p-3 bg-primary-300 rounded cursor-pointer"
        >
          로그인
        </button>
      </form>
      <Link href={"/sign-up"}>
        <button
          type="submit"
          className="w-full p-3 bg-primary-100 rounded mt-2 cursor-pointer"
        >
          회원가입
        </button>
      </Link>
    </section>
  );
}
