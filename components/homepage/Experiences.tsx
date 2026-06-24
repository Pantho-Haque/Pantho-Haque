"use client";
import { useState, useEffect } from "react";
import { SectionLabel, Pill } from "@/components";
import { TExperience } from "@/types";

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

export default function Experiences({ experiences }: { experiences: TExperience[] }) {
  return (
    <section style={{
      position: "relative",
      zIndex: 10,
      maxWidth: 1100,
      margin: "0 auto 40px",
      padding: "0 24px",
    }}>
      <SectionLabel>OPERATIONAL HISTORY</SectionLabel>

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
          <TypingText text="root@subject:~$ cat employment_log.txt" />
        </span>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {experiences?.map((exp, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(0,8,0,0.8)",
              border: "1px solid var(--border)",
              padding: "16px 20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Index number */}
            <div style={{
              position: "absolute",
              top: 12,
              right: 14,
              fontFamily: "var(--font-crt)",
              fontSize: 28,
              color: "rgba(0,255,65,0.06)",
              lineHeight: 1,
              userSelect: "none",
            }}>
              {String(idx + 1).padStart(2, "0")}
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 8,
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--green)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}>
                  {exp.title}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--amber)",
                  letterSpacing: "0.05em",
                }}>
                  @ {exp.company}
                </div>
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
                background: "rgba(0,255,65,0.05)",
                padding: "4px 8px",
                border: "1px solid var(--border)",
              }}>
                {exp.duration}
              </div>
            </div>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "rgba(0,255,65,0.7)",
              marginBottom: 14,
            }}>
              {exp.description}
            </p>

            {exp.detailed_desc_html && (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: "rgba(0,255,65,0.55)",
                  marginBottom: 14,
                }}
                dangerouslySetInnerHTML={{ __html: exp.detailed_desc_html }}
              />
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {exp.stack?.map((s) => (
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