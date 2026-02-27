"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import "./navbar.css";

export default function Navbar({ fetchData }) {
  const router = useRouter();

  const godash = () => {
    router.push("/");
    if (fetchData) fetchData();
  };

  return (
    <div className="container-fluid my-2">
      <ul className="nav d-flex align-items-center justify-content-between">
        <li className="nav-item">
          <button className="nav-link logo active" onClick={godash} type="button">
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
          <Link href="/register" className="nav-link hov">
            Register
          </Link>
          <button className="nav-link disabled" disabled type="button">
            Made by Ali Nawaz
          </button>
        </div>
      </ul>
    </div>
  );
}
