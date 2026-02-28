import { cookies } from "next/headers";

const SESSION_COOKIE = "donor_session";

/**
 * Returns the logged-in donor's ID from the session cookie, or null.
 */
export async function getSessionDonorId(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value || value.length !== 24) return null;
  return value;
}
