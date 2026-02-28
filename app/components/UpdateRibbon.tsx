export default function UpdateRibbon() {
  return (
    <div
      className="fixed top-0 right-0 z-50 overflow-hidden w-36 h-36 pointer-events-none"
      aria-hidden
    >
      <div
        className="absolute top-10 -right-12 w-48 bg-amber-400 text-amber-950 text-xs font-semibold text-center py-2.5 shadow-lg rotate-45"
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.25)" }}
      >
        Update in progress
      </div>
    </div>
  );
}
