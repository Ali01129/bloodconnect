"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [city, setCity] = useState("");
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const requestBody: Record<string, string> = {
        name,
        group,
        city,
        phone1: ph1,
      };
      if (ph2 !== "") requestBody.phone2 = ph2;

      const response = await fetch("/api/getdonor/adddonor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/");
      } else {
        if (Array.isArray(data.errors) && data.errors[0]?.msg) {
          setError(data.errors[0].msg);
        } else if (typeof data.errors === "string") {
          setError(data.errors);
        } else {
          setError("An error occurred while registering the donor.");
        }
      }
    } catch {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col p-5 max-w-full mx-auto">
        <div className="mt-8 w-[400px] max-[400px]:w-[300px] max-[400px]:ml-12 relative text-center">
          <div className="flex flex-col justify-center gap-5 p-5 rounded-md border-2 border-[#323232] shadow-[4px_4px_#323232] bg-gray-300">
            <div className="my-5 text-2xl font-black text-center text-[#323232]">
              Register Donor
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
              <input
                name="Name"
                placeholder="Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[350px] max-[400px]:w-[300px] h-9 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] px-2 py-1 text-[15px] font-semibold text-[#323232] focus:border-[#2d8cf0] outline-none placeholder:text-[#666]"
              />
              <input
                name="group"
                placeholder="Blood Group (example: A+)"
                type="text"
                required
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-[350px] max-[400px]:w-[300px] h-9 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] px-2 py-1 text-[15px] font-semibold text-[#323232] focus:border-[#2d8cf0] outline-none placeholder:text-[#666]"
              />
              <input
                name="city"
                placeholder="City"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-[350px] max-[400px]:w-[300px] h-9 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] px-2 py-1 text-[15px] font-semibold text-[#323232] focus:border-[#2d8cf0] outline-none placeholder:text-[#666]"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                type="text"
                required
                value={ph1}
                onChange={(e) => setPh1(e.target.value)}
                className="w-[350px] max-[400px]:w-[300px] h-9 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] px-2 py-1 text-[15px] font-semibold text-[#323232] focus:border-[#2d8cf0] outline-none placeholder:text-[#666]"
              />
              <input
                name="phone2"
                placeholder="Phone Number (Additional)"
                type="text"
                value={ph2}
                onChange={(e) => setPh2(e.target.value)}
                className="w-[350px] max-[400px]:w-[300px] h-9 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] px-2 py-1 text-[15px] font-semibold text-[#323232] focus:border-[#2d8cf0] outline-none placeholder:text-[#666]"
              />
              <button
                type="submit"
                className="my-5 w-30 h-10 rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_#323232] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-[0_0_#323232] active:translate-x-[3px] active:translate-y-[3px]"
              >
                Register
              </button>
            </form>
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}
