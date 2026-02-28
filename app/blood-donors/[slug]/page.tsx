import { notFound } from "next/navigation";
import type { Metadata } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";
import { getIdFromSlug } from "@/lib/slug";
import DonorProfile from "./DonorProfile";

type Props = { params: Promise<{ slug: string }> };

interface DonorData {
  _id: string;
  name: string;
  group: string;
  city: string;
  phone1?: string;
  phone2?: string;
}

async function getDonor(slug: string): Promise<DonorData | null> {
  const donorId = getIdFromSlug(slug);
  if (!donorId || !mongoose.Types.ObjectId.isValid(donorId)) return null;
  try {
    await dbConnect();
    const doc = await Donor.findById(donorId).lean();
    if (!doc) return null;
    const d = doc as { _id: { toString(): string }; name: string; group: string; city: string; phone1?: string; phone2?: string };
    return {
      _id: d._id.toString(),
      name: d.name,
      group: d.group,
      city: d.city,
      phone1: d.phone1,
      phone2: d.phone2,
    };
  } catch {
    return null;
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bloodconnect.org";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const donor = await getDonor(slug);
  if (!donor) {
    return { title: "Donor Not Found" };
  }
  const name = donor.name as string;
  const group = donor.group as string;
  const city = donor.city as string;
  const description = `${name} is a voluntary blood donor with blood type ${group} in ${city}. Contact this blood donor on Blood Connect – find blood donors by blood type and location.`;
  return {
    title: `${name} – Blood Donor ${group} in ${city}`,
    description,
    keywords: [
      "blood donor",
      `blood type ${group}`,
      `blood donor ${city}`,
      "voluntary blood donation",
      "find blood donor",
      group,
      city,
    ],
    openGraph: {
      title: `${name} | Blood Donor ${group} | ${city} | Blood Connect`,
      description: `${name} – Blood type ${group}, ${city}. Contact this donor on Blood Connect.`,
      url: `${siteUrl}/blood-donors/${slug}`,
      type: "profile",
      images: [{ url: "/blood.png", width: 512, height: 512, alt: "Blood Connect" }],
    },
    twitter: {
      card: "summary",
      title: `${name} | Blood Donor ${group} | ${city}`,
      description: `${name} – Blood type ${group}, ${city}. Contact on Blood Connect.`,
    },
    alternates: { canonical: `${siteUrl}/blood-donors/${slug}` },
  };
}

export default async function DonorPage({ params }: Props) {
  const { slug } = await params;
  const donor = await getDonor(slug);
  if (!donor) notFound();
  return <DonorProfile donor={donor} slug={slug} />;
}
