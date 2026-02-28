"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDonorSlug } from "@/lib/slug";
import Navbar from "@/app/components/Navbar";

interface Donor {
  _id: string;
  name: string;
  group: string;
  city: string;
  phone1?: string;
  phone2?: string;
}

interface DonorProfileProps {
  donor: Donor;
  slug: string;
}

const FALLBACK_ABOUT =
  "This donor is registered on Blood Connect and is willing to help when in need. Contact them to confirm availability and eligibility.";
const FALLBACK_HISTORY =
  "Donation history is not recorded yet. This donor may have donated in the past outside the platform.";

export default function DonorProfile({ donor, slug }: DonorProfileProps) {
  const [similarDonors, setSimilarDonors] = useState<Donor[]>([]);
  const [copied, setCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState(`/blood-donors/${slug}`);
  const [copyKey, setCopyKey] = useState(0);

  useEffect(() => {
    setProfileUrl(`${window.location.origin}/blood-donors/${slug}`);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/getdonor/searchgroup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ group: donor.group }),
        });
        const data = await res.json();
        if (cancelled || !data.donors) return;
        const others = (data.donors as Donor[]).filter((d: Donor) => d._id !== donor._id).slice(0, 5);
        setSimilarDonors(others);
      } catch {
        setSimilarDonors([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [donor._id, donor.group]);

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setCopyKey((k) => k + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const phones = [donor.phone1, donor.phone2].filter(Boolean);
  const hasContact = phones.length > 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#fdf8f8] via-[#fef7f7] to-[#fef2f2]">
        {/* Subtle grid texture */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(196,30,58,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,30,58,0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Back link – interactive */}
        <Link
          href="/"
          className="back-link-hover inline-flex items-center gap-2.5 text-stone-600 hover:text-[#c41e3a] font-medium transition-all duration-200 mb-8 py-2.5 px-4 rounded-xl border border-transparent hover:border-[#c41e3a]/20 hover:bg-[#c41e3a]/5 profile-animate"
          style={{ animationDelay: "0ms" }}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to donors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: 3/4 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Hero card – name and location only */}
            <div
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-200/50 overflow-hidden profile-card-hover profile-animate"
              style={{ animationDelay: "50ms" }}
            >
              <div className="h-2 bg-gradient-to-r from-[#c41e3a] via-[#d62848] to-[#e63950]" />
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-stone-800 mb-2 tracking-tight">
                    {donor.name || "Unknown donor"}
                  </h1>
                  <p className="inline-flex items-center gap-2 text-stone-600 font-medium">
                    <svg
                      className="w-4 h-4 shrink-0 text-[#c41e3a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {donor.city || "Location not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 stat cards – hover lift */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 profile-animate"
              style={{ animationDelay: "100ms" }}
            >
              {[
                {
                  label: "Blood group",
                  value: donor.group || "—",
                  sub: "Same type compatibility",
                  accent: true,
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                },
                {
                  label: "Location",
                  value: donor.city || "—",
                  sub: "City / area",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                },
                {
                  label: "Contact",
                  value: hasContact ? "Available" : "Not shared",
                  sub: phones.length ? `${phones.length} number(s)` : "—",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`profile-card-hover rounded-xl border shadow-sm p-5 flex flex-col gap-2 group ${
                    item.accent
                      ? "bg-red-600 border-red-600"
                      : "bg-white border-stone-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold uppercase tracking-wider ${
                      item.accent ? "text-white/90" : "text-stone-500"
                    }`}>
                      {item.label}
                    </p>
                    <span
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.accent ? "text-white bg-white/20 group-hover:bg-white/30" : "text-stone-400 bg-stone-100 group-hover:text-[#c41e3a] group-hover:bg-[#c41e3a]/10"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <p
                    className={`${item.accent ? "text-2xl md:text-3xl font-extrabold text-white" : "text-lg font-bold text-stone-800"}`}
                  >
                    {item.value}
                  </p>
                  <p className={`text-sm ${item.accent ? "text-white/80" : "text-stone-500"}`}>{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Contact information card */}
            <div
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden profile-card-hover profile-animate"
              style={{ animationDelay: "150ms" }}
            >
              <div className="p-6">
                <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-100 text-sky-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  Contact Information
                </h2>
                {hasContact ? (
                  <div className="space-y-4">
                    {donor.phone1 && (
                      <div className="flex flex-wrap items-center gap-3 py-3 px-4 rounded-xl bg-stone-100/80 border border-stone-200">
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-stone-500">Phone Number</p>
                          <a href={`tel:${donor.phone1}`} className="font-bold text-stone-800 hover:underline">{donor.phone1}</a>
                        </div>
                        <a
                          href={`https://wa.me/${donor.phone1.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#c41e3a]/10 text-[#c41e3a] border border-[#c41e3a]/20 hover:bg-[#c41e3a]/20 hover:border-[#c41e3a]/30 active:scale-[0.98] transition-colors shrink-0"
                        >
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                      </div>
                    )}
                    {donor.phone2 && (
                      <div className="flex flex-wrap items-center gap-3 py-3 px-4 rounded-xl bg-stone-100/80 border border-stone-200">
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-stone-500">Phone Number</p>
                          <a href={`tel:${donor.phone2}`} className="font-bold text-stone-800 hover:underline">{donor.phone2}</a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-stone-500 italic py-2">No contact information shared. Check back later.</p>
                )}
              </div>
            </div>

            {/* About the donor */}
            <div
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden profile-card-hover profile-animate"
              style={{ animationDelay: "200ms" }}
            >
              <div className="p-6">
                <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 text-violet-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  About the Donor
                </h2>
                <div className="rounded-xl bg-stone-100/80 border border-stone-200 p-4">
                  <p className="text-stone-600 leading-relaxed">{FALLBACK_ABOUT}</p>
                </div>
              </div>
            </div>

            {/* Donation history */}
            <div
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden profile-card-hover profile-animate"
              style={{ animationDelay: "250ms" }}
            >
              <div className="p-6">
                <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Donation History
                </h2>
                <div className="rounded-xl bg-emerald-50/80 border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 text-stone-600 mb-1">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Last Blood Donation</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-800">Never donated</p>
                  <p className="text-sm text-emerald-600/90 mt-0.5">First time donor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar: 1/4 */}
          <div className="lg:col-span-1 space-y-6">
            {/* Share this profile – copy feedback */}
            <div
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-200/50 overflow-hidden profile-animate-side"
              style={{ animationDelay: "80ms" }}
            >
              <div className="h-1.5 bg-gradient-to-r from-[#c41e3a] to-[#e63950]" />
              <div className="p-5">
                <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share this profile
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={profileUrl}
                    className="flex-1 min-w-0 h-11 px-3 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/20 focus:border-[#c41e3a]/40 transition-all"
                  />
                  <div className="relative">
                    <button
                      type="button"
                      key={copyKey}
                      onClick={copyLink}
                      className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                        copied
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                          : "bg-[#c41e3a] text-white hover:bg-[#9a1830] shadow-md shadow-[#c41e3a]/25 hover:shadow-[#c41e3a]/35"
                      } ${copied ? "copy-pop" : ""}`}
                      title={copied ? "Copied!" : "Copy link"}
                    >
                      {copied ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                    {copied && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-full text-center text-xs font-semibold text-emerald-600 whitespace-nowrap toast-in"
                        role="status"
                      >
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Similar blood group – card-style links */}
            <div
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden profile-animate-side"
              style={{ animationDelay: "120ms" }}
            >
              <div className="h-1 bg-gradient-to-r from-stone-100 to-stone-200/80" />
              <div className="p-5">
                <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#c41e3a]/10 text-[#c41e3a]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Similar blood group
                </h3>
                {similarDonors.length > 0 ? (
                  <div className="space-y-2">
                    {similarDonors.map((d) => (
                      <Link
                        key={d._id}
                        href={`/blood-donors/${getDonorSlug(d.name, d._id)}`}
                        className="flex items-center gap-3 py-3 px-4 rounded-xl border border-stone-200 bg-white hover:border-[#c41e3a]/30 hover:bg-[#c41e3a]/5 transition-all group"
                      >
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-stone-100 text-stone-500 group-hover:bg-[#c41e3a]/10 group-hover:text-[#c41e3a] shrink-0 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-stone-800 group-hover:text-[#c41e3a] transition-colors truncate">{d.name}</p>
                          <p className="text-xs text-stone-500">{d.city}</p>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded-lg bg-[#c41e3a] text-white text-sm font-bold">
                          {d.group}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-500 text-sm italic py-2">No other donors with this blood type found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
