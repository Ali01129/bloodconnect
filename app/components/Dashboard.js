"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import Card from "./Card";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

export default function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toshow, setToshow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError("Failed to load data");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = async (event) => {
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

  const handleClick = async (event) => {
    setLoading(true);
    const buttonText = event.target.textContent;
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

  const nextClick = () => setPage(page + 1);
  const previousClick = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <Navbar fetchData={fetchData} />
      <div className="container-fluid">
        <div
          className="container"
          style={{
            fontFamily: "Signika, sans-serif",
            textAlign: "center",
            color: "black",
          }}
        >
          <div className="text">Blood Donors</div>
          <div className="container">
            <input
              className="searchbar"
              type="text"
              placeholder="Search Donors"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="container my-5">
            <div className="row">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (group) => (
                  <button
                    key={group}
                    className="group col"
                    onClick={handleClick}
                    type="button"
                  >
                    {group}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: "600px" }}>
            {error}
          </div>
        )}
        {loading && <Spinner />}
        <div className="container custom-container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {toshow.map((element, index) => (
              <div key={element._id || index} className="col mb-4">
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark my-6"
            onClick={previousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={donors.length <= page * 21}
            type="button"
            className="btn btn-dark my-6"
            onClick={nextClick}
          >
            Next &rarr;
          </button>
        </div>
        <div style={{ color: "white" }}>made by ali</div>
      </div>
    </>
  );
}
