"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

const inputClass =
  "w-full px-4 py-3 text-[15px] text-[var(--blood-text)] bg-white/95 border border-stone-200 rounded-xl outline-none transition-all placeholder:text-stone-400 hover:border-stone-300 focus:border-[var(--blood-primary)] focus:ring-[3px] focus:ring-[var(--blood-primary)]/20";

function BloodLogo({ className }: { className?: string }) {
  return (
    <img
      src="/blood.png"
      alt=""
      className={className}
      width={28}
      height={28}
      aria-hidden
    />
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneIsWhatsApp, setPhoneIsWhatsApp] = useState(true);
  const [aboutDonor, setAboutDonor] = useState("");
  const [donationDates, setDonationDates] = useState<string[]>([""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addDonationDate = () => setDonationDates((prev) => [...prev, ""]);
  const setDonationDateAt = (index: number, value: string) => {
    setDonationDates((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };
  const removeDonationDate = (index: number) => {
    if (donationDates.length <= 1) return;
    setDonationDates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        name: name.trim(),
        email: email.trim(),
        password,
        group: bloodGroup,
        city: city.trim(),
        phone1: phone.trim(),
        phoneIsWhatsApp: !!phoneIsWhatsApp,
      };
      if (aboutDonor.trim()) body.aboutDonor = aboutDonor.trim();
      const datesStr = donationDates.filter((d) => d.trim() !== "").join(", ");
      if (datesStr) body.donationHistory = datesStr;

      const response = await fetch("/api/getdonor/adddonor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/");
      } else {
        if (Array.isArray(data.errors) && data.errors[0]?.msg) {
          setError(data.errors[0].msg);
        } else if (typeof data.errors === "string") {
          setError(data.errors);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-gradient-to-br from-[#fdf8f8] via-[#fef2f2] to-[#fce7e7]">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row flex-1 gap-0">
        {/* Left: Hero / messaging – full height on desktop */}
        <div className="lg:w-[44%] xl:w-[42%] flex-shrink-0 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--blood-primary) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative min-h-[280px] lg:min-h-full flex flex-col justify-start pt-12 pb-12 lg:pt-16 lg:pb-16 lg:pr-6 lg:pl-0 lg:overflow-y-auto">
            <div className="flex items-center gap-3 text-[var(--blood-primary)] mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                <BloodLogo className="h-8 w-8 object-contain" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--blood-primary)]">
                Donor registration
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold text-[var(--blood-text)] leading-tight tracking-tight max-w-md">
              Your one registration could save up to three lives.
            </h1>
            <p className="mt-4 text-lg text-[var(--blood-text-muted)] max-w-md leading-relaxed">
              Join thousands of voluntary donors. When someone in your city needs blood, they can find you here.
            </p>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                { value: "8", label: "Blood types" },
                { value: "100+", label: "Cities" },
                { value: "24/7", label: "Searchable" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-white/70 border border-white/80 px-4 py-3 text-center shadow-sm">
                  <span className="block text-xl font-bold text-[var(--blood-primary)]">{stat.value}</span>
                  <span className="block text-xs font-medium text-[var(--blood-text-muted)] mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {[
                "Get discovered by patients and families when they search by blood type and city.",
                "You decide when to respond. No obligation until you choose to help.",
                "One form, one profile — keep it updated and stay reachable.",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--blood-text-muted)]">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--blood-primary)] shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            {/* What happens next */}
            <div className="mt-8 rounded-2xl bg-white/80 border border-white/90 p-5 shadow-sm max-w-md">
              <h4 className="text-sm font-semibold text-[var(--blood-text)] mb-3">What happens next</h4>
              <ol className="space-y-2.5">
                {[
                  "Complete the form and join the registry.",
                  "Your profile appears when someone searches your blood type and city.",
                  "They contact you — you choose whether and when to help.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--blood-text-muted)]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--blood-primary)]/15 text-[var(--blood-primary)] font-semibold text-xs">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Quick fact */}
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[var(--blood-primary)]/10 border border-[var(--blood-primary)]/20 px-4 py-3 max-w-md">
              <BloodLogo className="h-5 w-5 shrink-0 mt-0.5 object-contain" />
              <div>
                <p className="text-sm font-medium text-[var(--blood-text)]">
                  One donation can help up to 3 people. Regular donors save countless lives over time.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-[var(--blood-text-muted)]">
              <span className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-emerald-600" />
                <span>Free to register</span>
              </span>
              <span className="flex items-center gap-2">
                <BloodLogo className="h-5 w-5 object-contain" />
                <span>Every drop counts</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Form – scrollable, aligned right to match navbar/footer */}
        <div className="flex-1 flex flex-col lg:overflow-y-auto min-w-0">
          <div className="flex-1 w-full max-w-2xl py-10 lg:py-14 lg:pl-6 lg:ml-auto">
            <div className="lg:hidden mb-8">
              <h2 className="text-2xl font-bold text-[var(--blood-text)]">
                Become a donor
              </h2>
              <p className="mt-1 text-[var(--blood-text-muted)]">
                Fill in your details to join the registry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section: Your details */}
              <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-xl shadow-stone-200/30 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-[var(--blood-text)] mb-5 flex items-center gap-2">
                  <span className="h-8 w-1 rounded-full bg-[var(--blood-primary)]" />
                  Your details
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Muhammad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* Section: Blood group */}
              <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-xl shadow-stone-200/30 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-[var(--blood-text)] mb-5 flex items-center gap-2">
                  <span className="h-8 w-1 rounded-full bg-[var(--blood-primary)]" />
                  Blood group
                </h3>
                <p className="text-sm text-[var(--blood-text-muted)] mb-4">
                  Select your blood type
                </p>
                <input type="hidden" name="group" value={bloodGroup} required />
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                  {BLOOD_GROUPS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setBloodGroup(g)}
                      className={`min-h-[52px] rounded-2xl border-2 text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--blood-primary)] focus:ring-offset-2 ${
                        bloodGroup === g
                          ? "border-[var(--blood-primary)] bg-[var(--blood-primary)] text-white shadow-md shadow-[var(--blood-primary)]/30"
                          : "border-stone-200 bg-white text-[var(--blood-text)] hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </section>

              {/* Section: Contact */}
              <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-xl shadow-stone-200/30 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-[var(--blood-text)] mb-5 flex items-center gap-2">
                  <span className="h-8 w-1 rounded-full bg-[var(--blood-primary)]" />
                  Contact
                </h3>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="e.g. Paris"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. +923001234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl bg-stone-50 border border-stone-100 hover:bg-stone-100/80 transition-colors">
                    <input
                      type="checkbox"
                      checked={phoneIsWhatsApp}
                      onChange={(e) => setPhoneIsWhatsApp(e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-[var(--blood-primary)] focus:ring-[var(--blood-primary)]"
                    />
                    <span className="text-sm text-[var(--blood-text)]">
                      This number is on WhatsApp — requesters can reach you there
                    </span>
                  </label>
                </div>
              </section>

              {/* Section: Optional */}
              <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/80 shadow-xl shadow-stone-200/30 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-[var(--blood-text)] mb-5 flex items-center gap-2">
                  <span className="h-8 w-1 rounded-full bg-stone-300" />
                  Optional
                </h3>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="aboutDonor" className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      About you
                    </label>
                    <textarea
                      id="aboutDonor"
                      name="aboutDonor"
                      rows={3}
                      placeholder="e.g. Available on weekends, prefer morning donations"
                      value={aboutDonor}
                      onChange={(e) => setAboutDonor(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--blood-text)] mb-1.5">
                      Donation history
                    </label>
                    <p className="text-xs text-[var(--blood-text-muted)] mb-3">
                      Add the date(s) you donated blood (optional)
                    </p>
                    <div className="space-y-3">
                      {donationDates.map((date, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDonationDateAt(index, e.target.value)}
                            className={`${inputClass} flex-1 min-w-0`}
                            max={new Date().toISOString().slice(0, 10)}
                          />
                          {donationDates.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => removeDonationDate(index)}
                              className="shrink-0 flex items-center justify-center w-11 h-[50px] rounded-xl border border-stone-200 bg-white text-stone-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                              title="Remove date"
                              aria-label="Remove date"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          ) : null}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addDonationDate}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-stone-200 text-stone-500 hover:border-[var(--blood-primary)]/50 hover:text-[var(--blood-primary)] hover:bg-[var(--blood-primary)]/5 transition-colors"
                      >
                        <PlusIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Add another date</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
                <p className="text-xs text-[var(--blood-text-muted)] order-2 sm:order-1">
                  By registering you agree to be contacted for blood donation requests.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="order-1 sm:order-2 cursor-pointer w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-[var(--blood-primary)] text-white font-semibold text-sm tracking-wide hover:bg-[var(--blood-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--blood-primary)] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[var(--blood-primary)]/25 hover:shadow-xl hover:shadow-[var(--blood-primary)]/30"
                >
                  {submitting ? "Registering…" : "Register as donor"}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
