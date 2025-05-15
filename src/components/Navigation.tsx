import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../public/logo.png";

export default function Navigation() {
  return (
    <nav className="flex w-4/5 mx-auto my-0 py-4 gap-10 items-center justify-between">
      <h1>
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={100} />
        </Link>
      </h1>
      <div className="border-emerald-800 border-1 p-2 rounded-2xl flex items-center  w-1/2">
        <BiSearch size={24} color="#527555" />
        <input type="text" className="focus:outline-0 w-full px-2" />
      </div>
      <div>
        <BsPersonCircle size={30} color="#527555" />
      </div>
    </nav>
  );
}
