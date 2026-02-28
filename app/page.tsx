import type { Metadata } from "next";
import Dashboard from "./components/Dashboard";

export const metadata: Metadata = {
  title: "Find Blood Donors – Blood Donation Registry",
  description:
    "Search blood donors by blood type, city, and location. Find voluntary blood donors for emergencies. Register as a blood donor and save lives. Blood Connect – every drop counts.",
  openGraph: {
    title: "Find Blood Donors – Blood Donation Registry | Blood Connect",
    description:
      "Search blood donors by blood type and city. Register as a donor. Every drop counts.",
    url: "/",
  },
};

export default function Page() {
  return <Dashboard />;
}
