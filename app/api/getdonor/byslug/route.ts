import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";
import { getIdFromSlug } from "@/lib/slug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug?.trim()) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }
  try {
    await dbConnect();
    const id = getIdFromSlug(slug.trim());
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ donor: null }, { status: 200 });
    }
    const donor = await Donor.findById(id).lean();
    if (!donor) {
      return NextResponse.json({ donor: null }, { status: 200 });
    }
    return NextResponse.json({
      donor: {
        _id: (donor as { _id: unknown })._id?.toString(),
        name: (donor as { name: string }).name,
        group: (donor as { group: string }).group,
        city: (donor as { city: string }).city,
        phone1: (donor as { phone1?: string }).phone1,
        phone2: (donor as { phone2?: string }).phone2,
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error("byslug error:", err.message || error);
    return NextResponse.json(
      { error: "Server error", message: process.env.NODE_ENV === "development" ? err.message : undefined },
      { status: 500 }
    );
  }
}
