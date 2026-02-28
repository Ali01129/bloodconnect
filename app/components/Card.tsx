import Link from "next/link";

interface CardProps {
  name: string;
  group: string;
  city: string;
  ph1?: string;
  ph2?: string;
  index?: number;
  slug: string;
}

export default function Card({ name, group, city, ph1 = "", ph2 = "", index, slug }: CardProps) {
  const gowhat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (ph1) window.open(`https://wa.me/${ph1}`, "_blank");
  };

  const phones = [ph1, ph2].filter(Boolean).join(" • ");

  return (
    <Link
      href={`/blood-donors/${slug}`}
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

        {/* WhatsApp CTA - stops propagation so clicking doesn't navigate */}
        <button
          type="button"
          onClick={gowhat}
          disabled={!ph1}
          className="btn-whatsapp mt-auto w-full py-3 px-4 rounded-xl text-[15px] font-semibold bg-[#f5f5f5] text-stone-700 border border-stone-200/80 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#f5f5f5] disabled:hover:text-stone-700 disabled:hover:border-stone-200/80 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 flex-none self-center" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {ph1 ? "Contact on WhatsApp" : "No contact"}
        </button>
      </div>
    </Link>
  );
}
