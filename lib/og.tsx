import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const corner = (pos: Record<string, number>, sides: string) => (
  <div style={{ position: "absolute", width: 48, height: 48, ...pos, borderColor: "#e6c878", borderStyle: "solid", borderWidth: 0, ...Object.fromEntries(sides.split(" ").map((s) => [`border${s}Width`, 4])) }} />
);

/** Shared case-file card for social previews. System font only, so it stays far under the 500 KB limit. */
export function ogCard({ kicker, title, lines, stat }: { kicker: string; title: string; lines: string[]; stat?: { value: string; label: string } }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#11100e", color: "#ece6d6", position: "relative", fontFamily: "sans-serif" }}>
        {corner({ top: 32, left: 32 }, "Top Left")}
        {corner({ top: 32, right: 32 }, "Top Right")}
        {corner({ bottom: 32, left: 32 }, "Bottom Left")}
        {corner({ bottom: 32, right: 32 }, "Bottom Right")}
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#e6c878", textTransform: "uppercase" }}>{kicker}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1 }}>{title}</div>
          {lines.map((l) => <div key={l} style={{ display: "flex", fontSize: 32, color: "#a9a08a", lineHeight: 1.3 }}>{l}</div>)}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          {stat && <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#e6c878" }}>{stat.value}</div>}
          {stat && <div style={{ display: "flex", fontSize: 26, color: "#a9a08a" }}>{stat.label}</div>}
        </div>
      </div>
    ),
    ogSize,
  );
}
