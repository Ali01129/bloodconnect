import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

export async function POST(request: Request) {
  try {
    const { bloodType, rh, city } = await request.json();

    await dbConnect();

    const filter: Record<string, unknown> = {};

    if (bloodType && rh) {
      filter.group = `${bloodType}${rh}`;
    } else if (bloodType) {
      filter.group = { $in: [`${bloodType}+`, `${bloodType}-`] };
    } else if (rh) {
      filter.group = { $regex: rh === "+" ? "\\+$" : "\\-$" };
    }

    if (city && typeof city === "string" && city.trim()) {
      filter.city = { $regex: city.trim(), $options: "i" };
    }

    const donors = await Donor.find(filter);
    return NextResponse.json({ donors });
  } catch (error) {
    console.error("filterdonor error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
