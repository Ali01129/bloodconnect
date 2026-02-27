"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [city, setCity] = useState("");
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");
  const [error, setError] = useState("");

  const godash = () => router.push("/");
  const goreg = () => router.push("/register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const requestBody = {
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
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <div className="container-fluid my-2">
        <ul className="nav d-flex align-items-center justify-content-between">
          <li className="nav-item">
            <button
              className="nav-link logo active"
              onClick={godash}
              type="button"
            >
              BloodConnect
            </button>
          </li>
          <div
            className="nav-item"
            style={{ display: "flex", fontFamily: "Signika, sans-serif" }}
          >
            <button className="nav-link hov" onClick={godash} type="button">
              Home
            </button>
            <button className="nav-link hov" onClick={goreg} type="button">
              Register
            </button>
            <button className="nav-link disabled" disabled type="button">
              Made by Ali Nawaz
            </button>
          </div>
        </ul>
      </div>
      <div className="wrapper">
        <div className="flip-card__inner mt-5">
          <div className="flip-card__front">
            <div className="title">Register Donor</div>
            <form className="flip-card__form" onSubmit={handleSubmit}>
              <input
                className="flip-card__input"
                name="Name"
                placeholder="Name"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="flip-card__input"
                name="group"
                placeholder="Blood Group (example: A+)"
                type="text"
                required
                onChange={(e) => setGroup(e.target.value)}
              />
              <input
                className="flip-card__input"
                name="city"
                placeholder="City"
                type="text"
                required
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="flip-card__input"
                name="phone"
                placeholder="Phone Number"
                type="text"
                required
                onChange={(e) => setPh1(e.target.value)}
              />
              <input
                className="flip-card__input"
                name="phone2"
                placeholder="Phone Number (Additional)"
                type="text"
                onChange={(e) => setPh2(e.target.value)}
              />
              <button className="flip-card__btn" type="submit">
                Register
              </button>
            </form>
            <div className="register-text">{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}
