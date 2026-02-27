"use client";

import Link from "next/link";
import Image from "next/image";
import "./home.css";

export default function Home() {
  return (
    <div>
      <div
        className="container my-4"
        style={{
          height: "550px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="left" style={{ flex: 1, textAlign: "center" }}>
          <div
            className="container"
            style={{ fontSize: "50px", fontWeight: "bold" }}
          >
            <div>Every Drop Counts, Every Donor Matters</div>
          </div>
          <Link href="/" className="b1 my-4 mx-2">
            <b>View Donnors</b>
          </Link>
          <Link href="/register" className="b1 my-4">
            <b>Register</b>
          </Link>
        </div>
        <div className="right" style={{ flex: 1 }}>
          <Image
            src="/db.png"
            alt="Background"
            width={600}
            height={550}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
