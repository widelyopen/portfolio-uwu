import { useEffect, useRef } from "react";

const CELL = 48;

const SNIPPETS = [
  "async def on_ready(self):",
  "await bot.tree.sync()",
  "SELECT * FROM users;",
  "@app_commands.command()",
  "pool = await asyncpg.create_pool()",
  "systemctl restart miami",
  "git push origin main",
  "except discord.Forbidden:",
  "intents = discord.Intents.all()",
  "const { data } = useLanyard(id)",
  "ssh root@vps",
  "CREATE INDEX ON guilds (id);",
  "200 OK",
  "while True:",
  "return await ctx.send(embed=e)",
  "INSERT INTO drops VALUES ($1, $2)",
  "tail -f bot.log",
];

// rgb triplets per Discord status, so the pulses follow it
const STATUS_RGB: Record<string, string> = {
  online: "35,165,90",
  idle: "240,178,50",
  dnd: "242,63,67",
  offline: "128,132,142",
};

interface Pulse {
  horizontal: boolean;
  pos: number;
  head: number;
  speed: number;
  len: number;
}
interface Snippet {
  text: string;
  x: number;
  y: number;
  speed: number;
  alpha: number;
}

export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The grid lights up around the cursor.
  useEffect(() => {
    const el = gridRef.current!;
    let raf = 0;
    let queued = false;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pulses travelling along grid lines + drifting code fragments.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnSnippet = (anywhere: boolean): Snippet => ({
      text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      x: Math.floor(Math.random() * (w / CELL)) * CELL + 8,
      y: anywhere ? Math.random() * h : h + 20,
      speed: 8 + Math.random() * 14,
      alpha: 0.07 + Math.random() * 0.08,
    });

    const snippets: Snippet[] = [];
    const count = Math.max(8, Math.round(w / 120));
    for (let i = 0; i < count; i++) snippets.push(spawnSnippet(true));
    const pulses: Pulse[] = [];
    let last = performance.now();
    let sinceSpawn = 0;

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      ctx.clearRect(0, 0, w, h);
      const rgb = STATUS_RGB[document.documentElement.dataset.status ?? "offline"] ?? STATUS_RGB.offline;

      ctx.font = '12px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = "top";
      for (let i = 0; i < snippets.length; i++) {
        const s = snippets[i];
        s.y -= s.speed * dt;
        const edge = Math.max(0, Math.min(1, Math.min(s.y, h - s.y) / 120));
        ctx.fillStyle = `rgba(236,233,228,${s.alpha * edge})`;
        ctx.fillText(s.text, s.x, s.y);
        if (s.y < -20) snippets[i] = spawnSnippet(false);
      }

      sinceSpawn += dt;
      if (sinceSpawn > 0.55 && pulses.length < 14) {
        sinceSpawn = 0;
        const horizontal = Math.random() < 0.5;
        const lines = Math.floor((horizontal ? h : w) / CELL);
        pulses.push({
          horizontal,
          pos: Math.floor(Math.random() * lines) * CELL + 0.5,
          head: -40,
          speed: 160 + Math.random() * 240,
          len: 90 + Math.random() * 140,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.head += p.speed * dt;
        const limit = p.horizontal ? w : h;
        if (p.head - p.len > limit) {
          pulses.splice(i, 1);
          continue;
        }
        const tail = p.head - p.len;
        const g = p.horizontal
          ? ctx.createLinearGradient(tail, 0, p.head, 0)
          : ctx.createLinearGradient(0, tail, 0, p.head);
        g.addColorStop(0, `rgba(${rgb},0)`);
        g.addColorStop(1, `rgba(${rgb},0.6)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (p.horizontal) {
          ctx.moveTo(tail, p.pos);
          ctx.lineTo(p.head, p.pos);
        } else {
          ctx.moveTo(p.pos, tail);
          ctx.lineTo(p.pos, p.head);
        }
        ctx.stroke();
        ctx.fillStyle = `rgba(${rgb},0.95)`;
        if (p.horizontal) ctx.fillRect(p.head - 1, p.pos - 2, 3, 4);
        else ctx.fillRect(p.pos - 2, p.head - 1, 4, 3);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="grid" ref={gridRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
