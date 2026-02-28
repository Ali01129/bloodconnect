import type { MetadataRoute } from "next";
import dbConnect from "@/lib/mongodb";
import Donor from "@/lib/Donor";
import { getDonorSlug } from "@/lib/slug";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bloodconnect.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  let donorPages: MetadataRoute.Sitemap = [];
  if (process.env.MONGODB_URI) {
    try {
      await dbConnect();
      const donors = await Donor.find({}).select("_id name").lean();
      donorPages = (donors as { _id: { toString(): string }; name: string }[]).map((d) => ({
        url: `${baseUrl}/blood-donors/${getDonorSlug(d.name, d._id.toString())}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    } catch {
      // DB unavailable at build or runtime – sitemap still has static pages
    }
  }

  return [...staticPages, ...donorPages];
}
