import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../navigation/Navbar";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toshow, setToshow] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateData();
  }, [donors, page]);

  const updateData = () => {
    const start = (page - 1) * 21;
    const end = start + 21;
    setToshow(donors.slice(start, end));
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${window.location.origin}/api/getdonor/viewdonor?page=${page}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    setDonors(data.donors);
    setLoading(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      if (search === "") {
        fetchData();
      } else {
        const response = await fetch(
          `${window.location.origin}/api/getdonor/searchdonor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: search }),
          }
        );
        const data = await response.json();
        setDonors(data.donors);
        setLoading(false);
        setPage(1);
      }
    }
  };

  const handleClick = async (event) => {
    setLoading(true);
    const buttonText = event.target.textContent;
    const response = await fetch(
      `${window.location.origin}/api/getdonor/searchgroup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group: buttonText }),
      }
    );
    const data = await response.json();
    setDonors(data.donors);
    setLoading(false);
    setPage(1);
  };

  const nextClick = () => {
    setPage(page + 1);
  };

  const previousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Navbar fetchData={fetchData} />
      <div className="w-full min-h-screen bg-[#f1f1f1] font-[Signika] text-center text-black">
        <div className="text-[47px] sm:text-[70px] md:text-[100px] lg:text-[120px] font-bold transition-all duration-700 hover:tracking-wide">
          Blood Donors
        </div>
        <div className="flex justify-center mt-4">
          <input
            className="w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-10 text-center rounded-md border-2 border-gray-500 focus:outline-none focus:border-red-500"
            type="text"
            placeholder="Search Donors"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-wrap justify-center my-8 gap-1.5 px-4">
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
            <button
              key={group}
              className="bg-[#dfdede] cursor-pointer rounded-md px-8 sm:px-10 md:px-12 lg:px-16 py-2 hover:bg-white text-sm sm:text-base"
              onClick={handleClick}
            >
              {group}
            </button>
          ))}
        </div>
        {loading && <Spinner />}
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toshow.map((element, index) => (
              <div key={index}>
                <Card
                  name={element.name}
                  group={element.group}
                  city={element.city}
                  ph1={element.phone1}
                  ph2={element.phone2}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            disabled={page <= 1}
            onClick={previousClick}
            className="btn btn-dark px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            &larr; Previous
          </button>
          <button
            disabled={donors.length <= page * 21}
            onClick={nextClick}
            className="btn btn-dark px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next &rarr;
          </button>
        </div>
        <div className="text-center text-white mt-4">made by ali</div>
      </div>
    </>
  );
};

export default Dashboard;
