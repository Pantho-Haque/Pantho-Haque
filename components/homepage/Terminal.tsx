"use client";
import { useEffect, useState } from "react";

export function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 30);
    }, delay);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, [text, delay]);

  return (
    <span className="font-(--font-mono)">
      {displayed}
      {displayed.length < text.length && <span style={{ animation: "blink 0.7s infinite" }}>_</span>}
    </span>
  );
}

export function TerminalBar({ command }: { command: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 border border-(--border) bg-(--surface) px-3.5 py-2">
      <span className="inline-block h-2 w-2 rounded-full bg-(--red)" />
      <span className="inline-block h-2 w-2 rounded-full bg-(--amber)" />
      <span className="inline-block h-2 w-2 rounded-full bg-(--green-dim)" />
      <span className="ml-2 font-(--font-mono) text-[13px] tracking-[0.1em] text-(--muted)">
        <TypingText text={command} />
      </span>
    </div>
  );
}
