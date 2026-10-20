import { useEffect, useState } from "react";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types each line out, holds, deletes, moves to the next.
export function useTyped(lines: string[]): string {
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduceMotion()) {
      setText(lines[0] ?? "");
      return;
    }
    let i = 0;
    let j = 0;
    let dir = 1;
    let timer = 0;

    const tick = () => {
      const line = lines[i];
      if (dir === 1) {
        j += 1;
        setText(line.slice(0, j));
        if (j >= line.length) {
          dir = -1;
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, 45 + Math.random() * 55);
      } else {
        j -= 1;
        setText(line.slice(0, j));
        if (j <= 0) {
          dir = 1;
          i = (i + 1) % lines.length;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 22);
      }
    };

    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, [lines]);

  return text;
}

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/";

// Decodes from noise into the real text, left to right.
export function useScramble(target: string, duration = 900): string {
  const [text, setText] = useState(target);

  useEffect(() => {
    if (reduceMotion()) {
      setText(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(p * target.length);
      setText(
        target
          .split("")
          .map((c, i) => (i < settled || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(step);
      else setText(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return text;
}
