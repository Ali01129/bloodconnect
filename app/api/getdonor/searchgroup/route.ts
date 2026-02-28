import { NextResponse } from "next/server";
import { body, validationResult } from "express-validator";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

const validations = [
  body("group", "Enter a valid group").isLength({ min: 2, max: 3 }),
];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const req = { body: data };
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return NextResponse.json(
        { errors: errors.array() },
        { status: 400 }
      );
    }

    await dbConnect();
    const donors = await Donor.find({ group: data.group });
    return NextResponse.json({ donors });
  } catch (error) {
    console.error("searchgroup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
