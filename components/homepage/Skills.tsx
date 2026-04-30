"use client";
import { useState, useEffect } from "react";
import { SectionLabel, Pill } from "@/components";
import { TSkills } from "@/types";

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span style={{ fontFamily: "var(--font-mono)" }}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: "blink 0.7s infinite" }}>_</span>
      )}
    </span>
  );
}

const categoryIcons: Record<string, string> = {
  languages: "01",
  frameworks: "02",
  databases: "03",
  tools: "04",
};

export default function Skills({ skills }: { skills: TSkills }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section style={{
      position: "relative",
      zIndex: 10,
      maxWidth: 1100,
      margin: "0 auto 40px",
      padding: "0 24px",
    }}>
      <SectionLabel>CAPABILITY MATRIX</SectionLabel>

      {/* Terminal header */}
      <div style={{
        background: "rgba(0,8,0,0.9)",
        border: "1px solid var(--border)",
        marginBottom: 12,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--amber)", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-dim)", display: "inline-block" }} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted)",
          marginLeft: 8,
          letterSpacing: "0.1em",
        }}>
          <TypingText text="root@subject:~$ cat skills.json | jq '.categories[]'" />
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 10,
      }}>
        {Object.entries(skills).map(([cat, list], idx) => (
          <div
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            style={{
              background: activeCategory === cat ? "rgba(0,30,0,0.9)" : "rgba(0,8,0,0.8)",
              border: `1px solid ${activeCategory === cat ? "var(--green)" : "var(--border)"}`,
              padding: "14px 16px",
              cursor: "crosshair",
              transition: "all 0.15s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.4)";
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }
            }}
          >
            {/* Category number */}
            <div style={{
              position: "absolute",
              top: 8,
              right: 10,
              fontFamily: "var(--font-crt)",
              fontSize: 28,
              color: "rgba(0,255,65,0.06)",
              lineHeight: 1,
              userSelect: "none",
            }}>
              {categoryIcons[cat] ?? String(idx + 1).padStart(2, "0")}
            </div>

            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 9,
              fontWeight: 700,
              color: "var(--green)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ color: "var(--muted)" }}>▸</span>
              {cat}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {(list as string[]).map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}