import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const SESSION_COOKIE = "donor_session";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const donorId = cookieStore.get(SESSION_COOKIE)?.value;
    if (!donorId || !mongoose.Types.ObjectId.isValid(donorId)) {
      return NextResponse.json({ error: "You must be logged in to update your profile." }, { status: 401 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.name !== undefined) {
      const name = String(body.name).trim();
      if (name.length < 3) {
        return NextResponse.json({ error: "Name must be at least 3 characters." }, { status: 400 });
      }
      updates.name = name;
    }
    if (body.group !== undefined) {
      if (!BLOOD_GROUPS.includes(body.group)) {
        return NextResponse.json({ error: "Invalid blood group." }, { status: 400 });
      }
      updates.group = body.group;
    }
    if (body.city !== undefined) {
      const city = String(body.city).trim();
      if (city.length < 2) {
        return NextResponse.json({ error: "City must be at least 2 characters." }, { status: 400 });
      }
      updates.city = city;
    }
    if (body.phone1 !== undefined) {
      const phone1 = String(body.phone1).trim();
      if (phone1.length < 11) {
        return NextResponse.json({ error: "Phone number must be at least 11 digits." }, { status: 400 });
      }
      updates.phone1 = phone1;
    }
    if (body.phone2 !== undefined) {
      updates.phone2 = body.phone2 === "" || body.phone2 == null ? undefined : String(body.phone2).trim();
      if (updates.phone2 !== undefined && (updates.phone2 as string).length < 11) {
        return NextResponse.json({ error: "Second phone must be at least 11 digits if provided." }, { status: 400 });
      }
    }
    if (body.phoneIsWhatsApp !== undefined) {
      updates.phoneIsWhatsApp = !!body.phoneIsWhatsApp;
    }
    if (body.aboutDonor !== undefined) {
      updates.aboutDonor = String(body.aboutDonor).trim() || undefined;
    }
    if (body.donationHistory !== undefined) {
      updates.donationHistory = String(body.donationHistory).trim() || undefined;
    }

    await dbConnect();
    const donor = await Donor.findByIdAndUpdate(
      donorId,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!donor) {
      return NextResponse.json({ error: "Donor not found." }, { status: 404 });
    }

    const d = donor as {
      _id: { toString(): string };
      name: string;
      group: string;
      city: string;
      phone1?: string;
      phone2?: string;
      email?: string;
      aboutDonor?: string;
      donationHistory?: string;
    };
    return NextResponse.json({
      donor: {
        _id: d._id.toString(),
        name: d.name,
        group: d.group,
        city: d.city,
        phone1: d.phone1,
        phone2: d.phone2,
        email: d.email,
        aboutDonor: d.aboutDonor,
        donationHistory: d.donationHistory,
      },
    });
  } catch (error) {
    console.error("updatedonor error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
