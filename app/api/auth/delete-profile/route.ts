import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

const SESSION_COOKIE = "donor_session";

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const donorId = cookieStore.get(SESSION_COOKIE)?.value;
    if (!donorId || !mongoose.Types.ObjectId.isValid(donorId)) {
      return NextResponse.json({ error: "You must be logged in to delete your profile." }, { status: 401 });
    }

    await dbConnect();
    const deleted = await Donor.findByIdAndDelete(donorId);
    if (!deleted) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("delete-profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
