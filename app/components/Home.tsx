"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl mx-auto my-4 min-h-[550px] flex items-center justify-center flex-col md:flex-row gap-6">
        <div className="flex-1 text-center">
          <div className="text-4xl md:text-5xl font-bold mb-6">
            Every Drop Counts, Every Donor Matters
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="relative text-lg px-6 py-3 bg-[rgb(245,36,36)] no-underline rounded-lg text-[#dedede] font-semibold active:translate-x-[0.1em] active:translate-y-[0.1em] transition-transform"
            >
              View Donors
            </Link>
            <Link
              href="/register"
              className="relative text-lg px-6 py-3 bg-[rgb(245,36,36)] no-underline rounded-lg text-[#dedede] font-semibold active:translate-x-[0.1em] active:translate-y-[0.1em] transition-transform"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full h-[550px] relative">
          <Image
            src="/db.png"
            alt="Background"
            width={600}
            height={550}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
