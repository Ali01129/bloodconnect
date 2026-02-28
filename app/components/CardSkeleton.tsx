export default function CardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden animate-pulse">
      {/* Accent bar */}
      <div className="h-1.5 bg-stone-200" />

      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Header: city + blood group badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="h-6 w-24 rounded-full bg-stone-200" />
          <div className="h-9 w-14 rounded-xl bg-stone-200" />
        </div>

        {/* Donor name */}
        <div className="h-8 w-3/4 rounded bg-stone-200 mb-3" />
        <div className="h-6 w-1/2 rounded bg-stone-100 mb-4" />

        {/* Contact info */}
        <div className="h-4 w-full rounded bg-stone-100 mb-4" />

        {/* CTA button */}
        <div className="mt-auto h-12 w-full rounded-xl bg-stone-200" />
      </div>
    </div>
  );
}
