export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[2px] border border-(--border) bg-(--green-muted) px-2.5 py-0.5 font-(--font-mono) text-[12px] uppercase tracking-[0.08em] text-(--green-dim) transition-all duration-150 hover:border-(--green-dim) hover:bg-[rgba(var(--green-rgb),0.25)] hover:text-(--green) hover:shadow-[0_0_10px_rgba(var(--green-rgb),0.25)]">
      {children}
    </span>
  );
}
