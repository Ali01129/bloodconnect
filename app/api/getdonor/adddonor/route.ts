import { NextResponse } from "next/server";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const validations = [
  body("name", "Enter a valid name (min 3 characters)").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail().normalizeEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  body("group", "Select a valid blood group")
    .isIn(BLOOD_GROUPS),
  body("city", "Enter a valid city").isLength({ min: 2 }),
  body("phone1", "Phone number must be at least 11 digits").isLength({
    min: 11,
  }),
  body("phone2", "Phone number must be at least 11 digits")
    .optional()
    .isLength({ min: 11 }),
  body("phoneIsWhatsApp").optional().isBoolean(),
  body("aboutDonor").optional().isString(),
  body("donationHistory").optional().isString(),
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

    const existing = await Donor.findOne({
      $or: [
        { email: data.email },
        {
          name: data.name,
          group: data.group,
          $or: [
            { phone1: data.phone1 },
            { phone2: data.phone1 },
            { phone1: data.phone2 },
            { phone2: data.phone2 },
          ],
        },
      ],
    });

    if (existing) {
      if (existing.email === data.email) {
        return NextResponse.json(
          { errors: "An account with this email already exists." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { errors: "A donor with this name, blood group and phone already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const payload: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      group: data.group,
      city: data.city,
      phone1: data.phone1,
      phoneIsWhatsApp: data.phoneIsWhatsApp !== false,
    };
    if (data.phone2) payload.phone2 = data.phone2;
    if (data.aboutDonor && String(data.aboutDonor).trim()) payload.aboutDonor = data.aboutDonor.trim();
    if (data.donationHistory && String(data.donationHistory).trim()) payload.donationHistory = data.donationHistory.trim();

    const created = await Donor.create(payload);
    return NextResponse.json({ created });
  } catch (error) {
    console.error("adddonor error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
