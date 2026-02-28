import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";
import { getDonorSlug } from "@/lib/slug";

const SESSION_COOKIE = "donor_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const donor = await Donor.findOne({ email: email.trim().toLowerCase() }).lean();
    if (!donor) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, (donor as { password: string }).password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const id = (donor as { _id: { toString(): string } })._id.toString();
    const slug = getDonorSlug((donor as { name: string }).name, id);

    const response = NextResponse.json({ slug, id });
    response.cookies.set(SESSION_COOKIE, id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
