import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    await dbConnect();
    const donors = await Donor.find({
      name: { $regex: name || "", $options: "i" },
    });
    return NextResponse.json({ donors });
  } catch (error) {
    console.error("searchdonor error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
