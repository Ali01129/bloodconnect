"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

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
      <div className="w-full">
        <div className="max-w-7xl mx-auto text-center text-black font-['Signika',sans-serif]">
          <div className="text-6xl md:text-[100px] sm:text-[70px] max-[476px]:text-[47px] font-bold text-black no-underline hover:tracking-[3px] transition-[letter-spacing] duration-300 ease-in-out">
            Blood Donors
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search Donors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-[30%] md:w-1/2 sm:w-[70%] max-[476px]:w-[80%] h-10 text-center rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="my-8 flex flex-wrap gap-2 justify-center">
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <button
                key={group}
                type="button"
                onClick={handleClick}
                className="h-11 max-[476px]:h-8 max-[476px]:text-xs border-none rounded bg-[#dfdede] mr-0.5 hover:bg-gray-200 active:bg-white px-4 py-2 transition-colors"
              >
                {group}
              </button>
            ))}
          </div>
        </div>
        {error && (
          <div className="max-w-[600px] mx-auto text-center px-4 py-3 rounded-lg bg-red-100 text-red-700">
            {error}
          </div>
        )}
        {loading && <Spinner />}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toshow.map((element, index) => (
              <div key={element._id || index}>
                <Card
                  name={element.name}
                  group={element.group}
                  city={element.city}
                  ph1={element.phone1}
                  ph2={element.phone2}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between px-4 my-6">
          <button
            type="button"
            disabled={page <= 1}
            onClick={previousClick}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={donors.length <= page * 21}
            onClick={nextClick}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            Next &rarr;
          </button>
        </div>
        <div className="text-white text-center py-4">made by ali</div>
      </div>
    </>
  );
}
