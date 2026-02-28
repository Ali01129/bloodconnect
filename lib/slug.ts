/**
 * Create a URL-safe slug from a donor name and id for unique, SEO-friendly URLs.
 * Format: "first-last-507f1f77bcf86cd799439011"
 */
export function getDonorSlug(name: string, id: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const cleanBase = base.replace(/-+/g, "-").replace(/^-|-$/g, "") || "donor";
  const idStr = typeof id === "string" ? id : String(id);
  return `${cleanBase}-${idStr}`;
}

const OBJECT_ID_LENGTH = 24;
const OBJECT_ID_REGEX = /^[a-f0-9]{24}$/;

/**
 * Extract MongoDB _id from a donor slug (last 24 hex chars).
 */
export function getIdFromSlug(slug: string): string | null {
  if (!slug || slug.length <= OBJECT_ID_LENGTH) return null;
  const tail = slug.slice(-OBJECT_ID_LENGTH);
  return OBJECT_ID_REGEX.test(tail) ? tail : null;
}
