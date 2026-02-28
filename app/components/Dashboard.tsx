"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import Navbar from "./Navbar";

interface Donor {
  _id: string;
  name: string;
  group: string;
  city: string;
  phone1?: string;
  phone2?: string;
}

export default function Dashboard() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toshow, setToshow] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/getdonor/viewdonor?page=${page}`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError("Failed to load data");
        setDonors([]);
        return;
      }
      setDonors(data.donors || []);
    } catch {
      setError("Failed to load data");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const start = (page - 1) * 21;
    const end = start + 21;
    setToshow(donors.slice(start, end));
  }, [donors, page]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLoading(true);
      if (search === "") {
        fetchData();
      } else {
        const response = await fetch("/api/getdonor/searchdonor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: search }),
        });
        const data = await response.json();
        setDonors(data.donors || []);
        setLoading(false);
        setPage(1);
      }
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    const buttonText = (event.target as HTMLButtonElement).textContent || "";
    const response = await fetch("/api/getdonor/searchgroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: buttonText }),
    });
    const data = await response.json();
    setDonors(data.donors || []);
    setLoading(false);
    setPage(1);
  };

  const nextClick = () => setPage((p) => p + 1);
  const previousClick = () => setPage((p) => (p > 1 ? p - 1 : p));

  return (
    <>
      <Navbar fetchData={fetchData} />
      <div className="w-full pb-16">
        {/* Hero section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/5 via-transparent to-[#e63950]/5" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#c41e3a]/10 mb-6 p-2">
              <Image src="/blood.png" alt="" width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 tracking-tight">
              Connect with <span className="text-[#c41e3a]">Donors</span>
            </h1>
            <p className="mt-3 text-stone-600 text-lg max-w-xl mx-auto">
              Find blood donors in your area. Every drop saves a life.
            </p>

            {/* Search bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search donors by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 bg-white shadow-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">Press Enter</span>
              </div>
            </div>

            {/* Blood type filters */}
            <p className="mt-8 text-sm font-medium text-stone-500 uppercase tracking-wider">Filter by blood type</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={handleClick}
                  className="h-10 px-5 rounded-full text-sm font-semibold border-2 border-stone-200 bg-white text-stone-700 hover:border-[#c41e3a]/50 hover:bg-[#c41e3a]/5 hover:text-[#c41e3a] active:border-[#c41e3a] active:bg-[#c41e3a]/10 transition-all duration-200 cursor-pointer"
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-[600px] mx-auto mt-8 text-center px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700">
            {error}
          </div>
        )}
        {/* Donor cards grid */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            ) : (
            toshow.map((element, index) => (
              <Card
                key={element._id || index}
                name={element.name}
                group={element.group}
                city={element.city}
                ph1={element.phone1}
                ph2={element.phone2}
                index={index}
              />
            ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 mt-10 py-6">
          <button
            type="button"
            disabled={page <= 1}
            onClick={previousClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <span className="text-sm text-stone-500 font-medium">
            page {donors.length === 0 ? 1 : page} of {Math.max(1, Math.ceil(donors.length / 21))}
          </span>
          <button
            type="button"
            disabled={donors.length <= page * 21}
            onClick={nextClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c41e3a] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#9a1830] transition-all shadow-md shadow-[#c41e3a]/25 cursor-pointer"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
