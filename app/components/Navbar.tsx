"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  fetchData?: () => void;
}

export default function Navbar({ fetchData }: NavbarProps) {
  const router = useRouter();

  const godash = () => {
    router.push("/");
    if (fetchData) fetchData();
  };

  return (
    <div className="w-full my-2">
      <nav className="flex items-center justify-between px-4">
        <button
          type="button"
          onClick={godash}
          className="font-bold text-[rgb(191,52,52)] text-3xl md:text-[30px] sm:text-xl max-[543px]:text-[15px] max-[437px]:text-[17px] font-['Bungee_Spice'] hover:opacity-90 transition-opacity"
        >
          BloodConnect
        </button>
        <div className="flex gap-4 font-['Signika',sans-serif]">
          <button
            type="button"
            onClick={godash}
            className="text-black hover:text-red-500 transition-colors text-base max-[649px]:text-[13px] max-[543px]:text-[10px]"
          >
            Home
          </button>
          <Link
            href="/register"
            className="text-black hover:text-red-500 transition-colors text-base max-[649px]:text-[13px] max-[543px]:text-[10px]"
          >
            Register
          </Link>
          <span className="text-gray-500 text-base max-[649px]:text-[13px] max-[543px]:text-[10px] max-[437px]:hidden">
            Made by Ali Nawaz
          </span>
        </div>
      </nav>
    </div>
  );
}
