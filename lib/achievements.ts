// Three small achievements, remembered per browser. Storage can be blocked (private mode), so every
// access is wrapped and the in-memory set keeps a toast from repeating within the page.
import { trackEvent } from "./track";

export const ACHIEVEMENTS = {
  case: "Investigator · opened your first case file",
  loadout: "Quartermaster · inspected the loadout",
  complete: "File complete · you reviewed everything",
} as const;
export type AchievementKey = keyof typeof ACHIEVEMENTS;

const GOT = "ph:achievements";
const OPENED = "ph:opened";
const shown = new Set<string>();

function read(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
function add(key: string, value: string) {
  try {
    const list = read(key);
    if (!list.includes(value)) localStorage.setItem(key, JSON.stringify([...list, value]));
  } catch {
    /* storage blocked: memory only */
  }
}

export function award(k: AchievementKey) {
  if (shown.has(k) || read(GOT).includes(k)) return;
  shown.add(k);
  add(GOT, k);
  window.dispatchEvent(new CustomEvent("ph:award", { detail: k }));
  trackEvent("achievement", { id: k });
}

export const openedCases = () => read(OPENED);
export function markOpened(slug: string) {
  add(OPENED, slug);
  award("case");
}
