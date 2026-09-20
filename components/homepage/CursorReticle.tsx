"use client";
import { useEffect, useRef } from "react";

export default function CursorReticle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.dataset.hot = (e.target as Element | null)?.closest?.("a,button,summary") ? "1" : "";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} aria-hidden className="reticle"><span className="reticle__ring" /></div>;
}
