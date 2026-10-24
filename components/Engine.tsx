"use client";
// The game layer. One rAF-throttled scroll handler drives the HUD, route line, level map, checkpoints,
// reveals and the finale score by touching server-rendered DOM. With JS off the page is a plain document.
import { useEffect } from "react";
import { award, openedCases } from "@/lib/achievements";

export default function Engine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) root.classList.add("anim");
    const start = Date.now();
    const secs = [...document.querySelectorAll<HTMLElement>(".sec[data-name]")];
    const map = [...document.querySelectorAll<HTMLAnchorElement>(".map a[data-lv]")];
    const lvl = document.getElementById("hud-lvl");
    const pct = document.getElementById("hud-pct");
    const levels = secs.filter((s) => s.dataset.level === "1");
    const reached = new Set<string>();
    const $ = (id: string) => document.getElementById(id);
    let raf = 0;

    const score = () => {
      const lv = $("score-lv"), cf = $("score-cf"), tm = $("score-tm");
      if (lv) lv.textContent = `${levels.filter((s) => reached.has(s.id)).length}/${levels.length}`;
      if (cf) cf.textContent = String(openedCases().length);
      if (tm) { const t = Math.floor((Date.now() - start) / 1000); tm.textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; }
    };

    const update = () => {
      raf = 0;
      const top = scrollY, vh = innerHeight, max = root.scrollHeight - vh;
      const prog = max > 0 ? Math.min(1, top / max) : 0;
      root.style.setProperty("--prog", prog.toFixed(4));
      if (pct) pct.textContent = `${Math.round(prog * 100)}%`;
      let cur = secs[0];
      for (const s of secs) {
        const y = s.getBoundingClientRect().top;
        if (y <= vh * 0.38) cur = s;
        if (y <= vh * 0.75 || prog > 0.985) { s.classList.add("reached"); reached.add(s.id); }
      }
      if (prog > 0.985) cur = secs[secs.length - 1];
      if (cur && lvl) lvl.textContent = cur.dataset.name ?? "";
      for (const a of map) {
        const isCur = a.dataset.lv === cur?.id;
        a.classList.toggle("cur", isCur);
        a.classList.toggle("done", reached.has(a.dataset.lv!) && !isCur);
        if (isCur) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      }
      for (const el of document.querySelectorAll<HTMLElement>(".rv:not(.in)")) {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("in");
      }
      score();
      if (prog > 0.985) award("complete");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    // J / K: next and previous level (ignored while typing).
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest?.("input, textarea, select, [contenteditable], dialog")) return;
      const k = e.key.toLowerCase();
      if (k !== "j" && k !== "k") return;
      const tops = secs.map((s) => s.getBoundingClientRect().top - 72);
      const i = k === "j" ? tops.findIndex((t) => t > 4) : tops.findLastIndex((t) => t < -8);
      if (i < 0) return;
      e.preventDefault();
      secs[i].scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    update();
    const timer = setInterval(score, 1000);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("keydown", onKey);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("keydown", onKey);
      root.classList.remove("anim");
    };
  }, []);
  return null;
}
