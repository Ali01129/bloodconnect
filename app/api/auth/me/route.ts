import { NextResponse } from "next/server";
import { getSessionDonorId } from "@/lib/auth";

export async function GET() {
  const donorId = await getSessionDonorId();
  return NextResponse.json({ loggedIn: !!donorId });
}
