import Link from "next/link";

interface CardProps {
  name: string;
  group: string;
  city: string;
  ph1?: string;
  ph2?: string;
  email?: string;
  index?: number;
  slug: string;
}

const btnBase =
  "mt-auto py-3 px-4 rounded-xl text-[15px] font-semibold bg-[#f5f5f5] text-stone-700 border border-stone-200/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";

export default function Card({ name, group, city, ph1 = "", ph2 = "", email = "", index, slug }: CardProps) {
  const hasPhone = !!(ph1 || ph2);
  const hasEmail = !!email;
  const hasBoth = hasPhone && hasEmail;
  const profileHref = `/blood-donors/${slug}`;

  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  const phones = [ph1, ph2].filter(Boolean).join(" • ");

  return (
    <Link
      href={profileHref}
      key={index}
      className="group block w-full font-['Signika',sans-serif] bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-lg hover:shadow-[#c41e3a]/5 hover:border-[#c41e3a]/20 transition-all duration-300 overflow-hidden"
    >
      {/* Blood type accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#c41e3a] to-[#e63950]" />

      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Header: city + blood group badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {city || "Unknown"}
          </span>
          <span className="shrink-0 inline-flex items-center justify-center min-w-[3rem] h-9 px-3 rounded-xl bg-[#c41e3a] text-white font-bold text-lg shadow-sm">
            {group}
          </span>
        </div>

        {/* Donor name */}
        <h3
          className={`font-bold text-stone-800 mb-3 ${name.length > 20 ? "text-xl" : "text-2xl md:text-3xl"}`}
        >
          {name}
        </h3>

        {/* Contact info */}
        {(ph1 || ph2) && (
          <p className="text-sm text-stone-500 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="break-all">{phones}</span>
          </p>
        )}

        {/* Contact CTAs: both → email + phone buttons; otherwise single phone or email button */}
        <div className={hasBoth ? "mt-auto flex gap-2" : "mt-auto"}>
          {hasBoth ? (
            <>
              <Link
                href={profileHref}
                onClick={stopProp}
                className={`${btnBase} flex-1 hover:bg-[#c41e3a]/10 hover:text-[#c41e3a] hover:border-[#c41e3a]/30`}
                title="View profile / Email"
              >
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </Link>
              <Link
                href={profileHref}
                onClick={stopProp}
                className={`${btnBase} flex-1 hover:bg-[#c41e3a]/10 hover:text-[#c41e3a] hover:border-[#c41e3a]/30`}
                title="View profile / Phone"
              >
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </Link>
            </>
          ) : hasPhone ? (
            <Link
              href={profileHref}
              onClick={stopProp}
              className={`${btnBase} w-full hover:bg-[#c41e3a]/10 hover:text-[#c41e3a] hover:border-[#c41e3a]/30`}
              title="View profile"
            >
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {hasPhone ? "View contact" : "No contact"}
            </Link>
          ) : hasEmail ? (
            <Link
              href={profileHref}
              onClick={stopProp}
              className={`${btnBase} w-full hover:bg-[#c41e3a]/10 hover:text-[#c41e3a] hover:border-[#c41e3a]/30`}
              title="View profile"
            >
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              View contact
            </Link>
          ) : (
            <span className={`${btnBase} w-full opacity-60 cursor-default`}>
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              No contact
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
