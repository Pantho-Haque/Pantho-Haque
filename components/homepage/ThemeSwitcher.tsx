"use client";
import { useSyncExternalStore } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, DEFAULT_THEME, STORAGE_KEY, type Theme } from "./themes";

const getTheme = () => document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

function applyTheme(t: Theme) {
  const root = document.documentElement;
  THEMES.forEach(o => Object.keys(o.vars).forEach(k => root.style.removeProperty(k)));
  if (t.id === DEFAULT_THEME) {
    root.removeAttribute("data-theme");
    localStorage.removeItem(STORAGE_KEY);
  } else {
    Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-theme", t.id);
    localStorage.setItem(STORAGE_KEY, t.id);
  }
}

/* Miniature screen showing the preset's background, accent, and text tones. */
function Preview({ vars }: { vars: Theme["vars"] }) {
  const accent = `rgb(${vars["--green-rgb"]})`;
  return (
    <span aria-hidden className="relative block h-12 w-full overflow-hidden rounded-[2px] border border-white/5" style={{ background: vars["--bg"] }}>
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: accent }} />
      <span className="absolute left-2 top-[11px] h-[3px] w-7 rounded-full" style={{ background: vars["--text"] }} />
      <span className="absolute left-2 top-[19px] h-[3px] w-12 rounded-full" style={{ background: vars["--text-dim"] }} />
      <span className="absolute left-2 top-[27px] h-[3px] w-9 rounded-full" style={{ background: vars["--muted"] }} />
      <span className="absolute bottom-2 left-2 h-[5px] w-5 border" style={{ borderColor: accent, background: `rgba(${vars["--green-rgb"]},0.15)` }} />
      <span className="absolute bottom-[7px] right-2 h-[7px] w-[7px] rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
    </span>
  );
}

export default function ThemeSwitcher() {
  const active = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);

  return (
    <>
      <button
        type="button"
        popoverTarget="theme-menu"
        aria-label="Change color theme"
        title="Change color theme"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 cursor-crosshair items-center justify-center rounded-full border border-(--border) bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] text-(--green) shadow-[0_0_18px_rgba(var(--green-rgb),0.25)] backdrop-blur-sm transition-colors duration-200 hover:border-(--green) hover:bg-(--green-muted)"
      >
        <Palette size={18} />
      </button>

      <div id="theme-menu" popover="auto" className="theme-menu">
        <div className="mb-2.5 flex items-center justify-between border-b border-(--border) pb-2 text-[11px] tracking-[0.2em] text-(--muted)">
          <span>{"// PRESETS //"}</span>
          <span>{String(THEMES.length).padStart(2, "0")} TOTAL</span>
        </div>
        <ul className="grid grid-cols-2 gap-1.5">
          {THEMES.map(t => {
            const on = active === t.id;
            return (
              <li key={t.id}>
                <button type="button" onClick={() => applyTheme(t)} aria-pressed={on}
                  className={`flex w-full cursor-crosshair flex-col gap-1.5 border p-1.5 text-left transition-colors hover:border-(--green) hover:bg-(--green-muted) ${on ? "border-(--green) bg-(--green-muted)" : "border-(--border)"}`}>
                  <Preview vars={t.vars} />
                  <span className={`flex items-center justify-between px-0.5 text-[11px] uppercase tracking-[0.12em] ${on ? "text-(--green)" : "text-(--text-dim)"}`}>
                    {t.label}{on && <Check size={11} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-2.5 border-t border-(--border) pt-2 text-[10px] tracking-[0.15em] text-(--muted)">SAVED TO THIS BROWSER</div>
      </div>
    </>
  );
}
