"use client";
import Input from "@/components/Input";
import { createUser } from "@/lib/api/firebase";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(email, password);
  };
  return (
    <section className="w-96 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="">아이디</label>
        <Input type="text" onChange={setEmail} />
        <Input type="password" onChange={setPassword} />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
