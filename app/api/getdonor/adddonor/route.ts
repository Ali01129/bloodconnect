import { NextResponse } from "next/server";
import { body, validationResult } from "express-validator";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";

const validations = [
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("group", "Enter a valid blood Group(example: A+)").isLength({ min: 2 }),
  body("city", "Enter a valid city").isLength({ min: 2 }),
  body("phone1", "Phone number must be atlest 11 digit long").isLength({
    min: 11,
  }),
  body("phone2", "Phone number must be atlest 11 digit long")
    .optional()
    .isLength({ min: 11 }),
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

    const donor = await Donor.findOne({
      name: data.name,
      group: data.group,
      $or: [
        { phone1: data.phone1 },
        { phone2: data.phone1 },
        { phone1: data.phone2 },
        { phone2: data.phone2 },
      ],
    });

    if (!donor) {
      const created = await Donor.create({
        name: data.name,
        group: data.group,
        city: data.city,
        phone1: data.phone1,
        phone2: data.phone2,
      });
      return NextResponse.json({ created });
    }

    return NextResponse.json(
      { errors: "Donor already exist" },
      { status: 400 }
    );
  } catch (error) {
    console.error("adddonor error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
