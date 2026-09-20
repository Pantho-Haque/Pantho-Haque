/* Color presets. Each one overrides the CSS variables in styles/survailance.css.
   The --green-* names are historical: they mean "accent", whatever the hue. */
export type Theme = { id: string; label: string; vars: Record<string, string> };

const preset = (
  id: string, label: string,
  accentRgb: string, dim: string, dark: string,
  text: string, textDim: string, muted: string, bg: string,
  extra: Record<string, string> = {},
): Theme => ({
  id, label,
  // --amber is the secondary accent (company names, scan state); warm by default, overridden by warm presets
  vars: { "--green-rgb": accentRgb, "--green-dim": dim, "--green-dark": dark, "--text": text, "--text-dim": textDim, "--muted": muted, "--bg": bg, "--amber": "#f3b95f", ...extra },
});

export const THEMES: Theme[] = [
  preset("gold",     "Gold",     "230, 200, 120", "#c9ad5f", "#3a2f14", "#ece6d6", "#bdb49c", "#948c76", "#151412", { "--amber": "#8ecae6" }),
  preset("matrix",   "Matrix",   "94, 222, 138",  "#4cbf78", "#123d24", "#d6e3d9", "#9db3a2", "#7f927f", "#121513"),
  preset("emerald",  "Emerald",  "52, 199, 148",  "#2ea77c", "#0e3a2c", "#d4e6df", "#98b5aa", "#7a938a", "#111614"),
  preset("cyan",     "Cyan",     "94, 210, 230",  "#4bb8cc", "#0f3540", "#d5e4e8", "#9db6bd", "#7e959b", "#111517"),
  preset("azure",    "Azure",    "96, 165, 250",  "#4f8fdc", "#12294a", "#d8e1ee", "#9fb0c8", "#7f8da3", "#111318"),
  preset("violet",   "Violet",   "176, 140, 255", "#9a7ce6", "#2a1f4d", "#dfd9ec", "#aca2c8", "#8d85a3", "#131217"),
  preset("rose",     "Rose",     "244, 114, 182", "#d45f9c", "#451a33", "#ecd9e4", "#c09fb3", "#9b8290", "#171215"),
  preset("crimson",  "Crimson",  "240, 96, 96",   "#cf4f4f", "#401212", "#e9d9d9", "#bc9e9e", "#987f7f", "#161111", { "--red": "#ffd166" }),
  preset("amber",    "Amber",    "245, 185, 95",  "#d9a04a", "#3d2a10", "#e8dfcf", "#b8aa90", "#93876f", "#151311", { "--amber": "#7dd3fc" }),
  preset("graphite", "Graphite", "200, 208, 214", "#a9b2ba", "#2c3238", "#e4e7ea", "#aab2b9", "#858d94", "#151618"),
];

export const DEFAULT_THEME = THEMES[0].id;
export const STORAGE_KEY = "theme";

/** Runs before first paint (inlined in layout.tsx) so a saved preset never flashes the default. */
export const PRE_PAINT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var T=${JSON.stringify(Object.fromEntries(THEMES.map(t => [t.id, t.vars])))};var v=T[t];if(v){var r=document.documentElement;r.setAttribute("data-theme",t);for(var k in v)r.style.setProperty(k,v[k])}}catch(e){}`;
