"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  fetchData?: () => void;
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.69Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
  );
}

function AddPersonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {/* Person */}
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      {/* Plus - larger */}
      <path d="M16 10.25h6v1.5h-6zM18.25 8h1.5v6h-1.5z" />
    </svg>
  );
}

export default function Navbar({ fetchData }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const godash = () => {
    router.push("/");
    if (fetchData) fetchData();
  };

  return (
    <div className="w-full py-5 px-2 bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <button
          type="button"
          onClick={godash}
          className="font-bold text-[rgb(191,52,52)] text-3xl md:text-[30px] sm:text-xl max-[543px]:text-[15px] max-[437px]:text-[17px] font-['Bungee_Spice'] hover:opacity-90 transition-opacity cursor-pointer"
        >
          BloodConnect
        </button>
        <div className="flex items-center gap-4 font-['Signika',sans-serif]">
          <button
            type="button"
            onClick={godash}
            className={
              isHome
                ? "flex items-center gap-2 text-red-600 bg-red-100 border border-red-300 rounded-lg px-3 py-1.5 text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
                : "flex items-center gap-2 text-black rounded-lg px-3 py-1.5 border border-transparent text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
            }
          >
            <HomeIcon className="size-5 shrink-0" />
            <span>Home</span>
          </button>
          <Link
            href="/register"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-base max-[649px]:text-[13px] max-[543px]:text-[10px] cursor-pointer"
          >
            <AddPersonIcon className="size-5 shrink-0" />
            <span>Become a Donor</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
