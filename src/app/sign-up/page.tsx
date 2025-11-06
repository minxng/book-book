"use client";
import Input from "@/components/Input";
import { createUser, signIn } from "@/lib/api/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/logo.png";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(email && password && name && checkPassword)) {
      return alert("입력하지 않은 항목이 있습니다.");
    }
    if (password.length < 6) {
      return alert("비밀번호는 6자 이상 입력해주세요.");
    }
    if (password !== checkPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    const result = await createUser(email, password, name);
    if (result.success) {
      signIn(email, password);
      router.replace("/");
    } else {
      if (result.error === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else if (result.error === "auth/invalid-email") {
        alert("잘못된 이메일 형식입니다.");
      } else {
        alert("회원가입에 실패했습니다");
      }
    }
  };
  return (
    <section className="h-lvh sm:bg-gray-50 flex items-center">
      <div className="w-96 mx-auto sm:border border-primary-200 rounded-2xl px-8 pb-12 bg-white">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} className="mx-auto my-12" />
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>이름</label>
          <Input type="text" onChange={setName} />
          <label>이메일</label>
          <Input type="text" onChange={setEmail} />
          <label>비밀번호</label>
          <Input type="password" onChange={setPassword} />
          <label>비밀번호 확인</label>
          <Input type="password" onChange={setCheckPassword} />
          <button
            type="submit"
            className="w-full p-3 bg-primary-200 rounded mt-2 cursor-pointer"
          >
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
}
