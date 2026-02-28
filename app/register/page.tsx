import type { Metadata } from "next";
import Register from "../components/Register";

export const metadata: Metadata = {
  title: "Register as Blood Donor – Join Blood Connect",
  description:
    "Register as a voluntary blood donor. Add your blood type, city, and contact. Help save lives – join the Blood Connect donor registry and be there when someone needs blood.",
  keywords: [
    "register blood donor",
    "become blood donor",
    "voluntary blood donation",
    "blood donor registration",
    "donate blood",
  ],
  openGraph: {
    title: "Register as Blood Donor | Blood Connect",
    description: "Join the donor registry. Add your blood type and city. Save lives.",
    url: "/register",
  },
};

export default function RegisterPage() {
  return <Register />;
}
