export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-500/30" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-500/30" />
    </div>
  );
}