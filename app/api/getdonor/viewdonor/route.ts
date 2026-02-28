import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

export async function POST() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("viewdonor: MONGODB_URI is not defined");
      return NextResponse.json(
        { error: "MONGODB_URI not configured. Add it to .env" },
        { status: 500 }
      );
    }
    await dbConnect();
    const donors = await Donor.find({});
    return NextResponse.json({ donors });
  } catch (error) {
    const err = error as Error;
    console.error("viewdonor error:", err.message || error);
    return NextResponse.json(
      {
        error: "Server error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
