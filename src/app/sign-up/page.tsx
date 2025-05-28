"use client";
import Input from "@/components/Input";
import { createUser } from "@/lib/api/firebase";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(email, password, name);
  };
  return (
    <section className="w-96 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>이름</label>
        <Input type="text" onChange={setName} />
        <label htmlFor="">이메일</label>
        <div className="flex">
          <Input type="text" onChange={setEmail} />
          <button>중복확인</button>
        </div>
        <label htmlFor="">비밀번호</label>
        <Input type="password" onChange={setPassword} />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
