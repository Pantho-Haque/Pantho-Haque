"use client";
import { TProject } from "@/types";
import { SectionLabel } from "@/components";
import { Code2, ExternalLink } from "lucide-react";

export default function Projects({ projects }: { projects: TProject[] }) {
  const sorted = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <section style={{
      position: "relative",
      zIndex: 10,
      maxWidth: 1100,
      margin: "0 auto 80px",
      padding: "0 24px",
    }}>
      <SectionLabel>CLASSIFIED PROJECTS</SectionLabel>

      {/* Header row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr 120px 80px 60px",
        gap: 12,
        padding: "6px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        color: "var(--muted)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        borderBottom: "1px solid var(--border)",
        marginBottom: 4,
      }}>
        <span>#</span>
        <span>Project</span>
        <span>Stack</span>
        <span style={{ textAlign: "center" }}>Status</span>
        <span style={{ textAlign: "right" }}>Links</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </div>

      {/* Card grid for mobile / alt view */}
      <div className="project-cards" style={{
        display: "none",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 12,
        marginTop: 20,
      }}>
        {sorted.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-table { display: none !important; }
          .project-cards { display: grid !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectRow({ project: p, index: i }: { project: TProject; index: number }) {
  return (
    <div
      className="project-table"
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr 120px 80px 60px",
        gap: 12,
        padding: "10px 14px",
        background: "rgba(0,8,0,0.6)",
        border: "1px solid transparent",
        fontFamily: "var(--font-mono)",
        alignItems: "start",
        transition: "all 0.15s",
        cursor: "crosshair",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(0,25,0,0.9)";
        el.style.borderColor = "var(--border)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(0,8,0,0.6)";
        el.style.borderColor = "transparent";
      }}
    >
      {/* Hover left accent */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 2,
        background: "var(--green)",
        opacity: 0,
        transition: "opacity 0.15s",
      }} className="row-accent" />

      <span style={{ fontSize: 9, color: "var(--muted)", paddingTop: 2 }}>
        {String(i + 1).padStart(2, "0")}
      </span>

      <div>
        <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginBottom: 4, letterSpacing: "0.05em" }}>
          {p.name}
        </div>
        <div style={{ fontSize: 10, color: "rgba(0,255,65,0.45)", lineHeight: 1.7 }}>
          {p.desc}
        </div>
      </div>

      <div style={{ fontSize: 9, color: "var(--muted)", lineHeight: 1.7, paddingTop: 2 }}>
        {p.stack.split(" · ").map(s => (
          <div key={s} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s}</div>
        ))}
      </div>

      <div style={{ textAlign: "center", paddingTop: 2 }}>
        <span style={{
          fontSize: 9,
          letterSpacing: "0.1em",
          color: p.live ? "var(--green)" : "var(--muted)",
          border: `1px solid ${p.live ? "var(--border)" : "rgba(74,90,74,0.3)"}`,
          padding: "2px 6px",
          display: "inline-block",
        }}>
          {p.live ? "LIVE" : "PRIVATE"}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--muted)", transition: "color 0.1s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--green)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted)"}
          >
            <ExternalLink size={12} />
          </a>
        )}
        {p.code && (
          <a href={p.code} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--muted)", transition: "color 0.1s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--green)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted)"}
          >
            <Code2 size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project: p }: { project: TProject; index: number }) {
  return (
    <div style={{
      background: "rgba(0,8,0,0.8)",
      border: "1px solid var(--border)",
      padding: "14px 16px",
      position: "relative",
      transition: "border-color 0.15s",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.5)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
    >
      <div style={{ height: 1, background: "linear-gradient(90deg, var(--green), transparent)", marginBottom: 12 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--green)",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}>
          {p.name}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--green)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted)"}
            >
              <ExternalLink size={12} />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--green)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted)"}
            >
              <Code2 size={12} />
            </a>
          )}
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(0,255,65,0.45)", lineHeight: 1.7, marginBottom: 10 }}>
        {p.desc}
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green-dim)", letterSpacing: "0.08em", opacity: 0.7 }}>
        {p.stack}
      </div>
    </div>
  );
}