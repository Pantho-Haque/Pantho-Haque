export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 px-1">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-(--border-bright)" />
      <span className="whitespace-nowrap font-(--font-display) text-[14px] font-bold uppercase tracking-[0.25em] text-(--green)">
        <span className="text-(--muted)">[ </span>{children}<span className="text-(--muted)"> ]</span>
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-(--border-bright)" />
    </div>
  );
}
