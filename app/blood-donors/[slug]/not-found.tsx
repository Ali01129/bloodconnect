import Link from "next/link";

export default function DonorNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Donor not found</h1>
        <p className="text-stone-600 mb-6">
          This profile may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#c41e3a] text-white font-semibold hover:bg-[#9a1830] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to donors
        </Link>
      </div>
    </div>
  );
}
