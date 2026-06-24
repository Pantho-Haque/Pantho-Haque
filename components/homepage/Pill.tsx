export default function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded border border-teal-900/60 bg-teal-950/50 px-2! py-1 text-[10px] font-semibold text-teal-400">{children}</span>;
}