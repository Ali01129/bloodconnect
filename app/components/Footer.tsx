import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-stone-200/80 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-bold text-[#c41e3a] text-2xl font-['Bungee_Spice']">
              BloodConnect
            </span>
            <p className="mt-1 text-base text-stone-500 font-['Signika',sans-serif]">
              Every Drop Counts, Every Donor Matters
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/"
              className="text-base font-medium text-stone-600 hover:text-[#c41e3a] transition-colors"
            >
              View Donors
            </Link>
            <Link
              href="/home"
              className="text-base font-medium text-stone-600 hover:text-[#c41e3a] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/register"
              className="text-base font-medium text-stone-600 hover:text-[#c41e3a] transition-colors"
            >
              Register as Donor
            </Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400">
            © {currentYear} BloodConnect. Connecting donors with those in need.
          </p>
          <p className="text-sm text-stone-500 font-medium">Made by Ali Nawaz</p>
        </div>
      </div>
    </footer>
  );
}
