"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { Label } from "@/components/julian/ui/Label";
import text from "@/components/julian/ui/text.module.css";
import s from "./sections.module.css";

const BEST_KEY = "gp-keepup-best";

type State = "idle" | "playing" | "over";

/**
 * Keep the orb up. One paddle, one ball, a rally counter: the smallest game
 * that is still a game. It uses the site's own orb and ivory, runs on a
 * canvas sized to the device pixel ratio, and pauses itself whenever it is
 * off screen or the tab is hidden so it never burns a phone battery in the
 * background. Pointer, touch and arrow keys all steer; reduced motion gets
 * a still board it can start on demand.
 */
export function Game() {
  const { label, heading, body, hint } = homeContent.game;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // Everything the loop mutates lives here, so React never re-renders a frame.
  const game = useRef({
    w: 0,
    h: 0,
    paddleX: 0.5,
    target: 0.5,
    ball: { x: 0.5, y: 0.4, vx: 0.004, vy: 0.006, r: 10 },
    rallies: 0,
    raf: 0,
    running: false,
    visible: true,
  });

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(BEST_KEY));
      if (Number.isFinite(saved) && saved > 0) setBest(saved);
    } catch {
      /* private windows and blocked storage: the game just forgets */
    }
  }, []);

  const reset = useCallback(() => {
    const g = game.current;
    g.ball = { x: 0.5, y: 0.35, vx: (Math.random() > 0.5 ? 1 : -1) * 0.0035, vy: 0.0055, r: 10 };
    g.rallies = 0;
    g.paddleX = 0.5;
    g.target = 0.5;
    setScore(0);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const g = game.current;
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim() || "#e9e2d4";
    const line = styles.getPropertyValue("--line-solid").trim() || "#1e1e24";

    ctx.clearRect(0, 0, g.w, g.h);

    // the floor the orb must not pass
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, g.h - 2);
    ctx.lineTo(g.w, g.h - 2);
    ctx.stroke();

    const paddleW = Math.max(74, g.w * 0.13);
    const paddleH = 7;
    const px = g.paddleX * g.w - paddleW / 2;
    const py = g.h - 26;
    ctx.fillStyle = accent;
    ctx.beginPath();
    // roundRect is missing on Safari before 16, and a throw here would kill
    // every frame; a plain rect is a fine paddle.
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(px, py, paddleW, paddleH, 999);
    } else {
      ctx.rect(px, py, paddleW, paddleH);
    }
    ctx.fill();

    const bx = g.ball.x * g.w;
    const by = g.ball.y * g.h;
    const glow = ctx.createRadialGradient(bx, by, 0, bx, by, g.ball.r * 3.4);
    glow.addColorStop(0, "rgba(233,226,212,0.34)");
    glow.addColorStop(1, "rgba(233,226,212,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(bx, by, g.ball.r * 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(bx, by, g.ball.r, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const stop = useCallback(
    (over: boolean) => {
      const g = game.current;
      g.running = false;
      cancelAnimationFrame(g.raf);
      if (over) {
        setState("over");
        setBest((prev) => {
          const next = Math.max(prev, g.rallies);
          try {
            window.localStorage.setItem(BEST_KEY, String(next));
          } catch {
            /* ignore */
          }
          return next;
        });
      }
    },
    [],
  );

  const loop = useCallback(
    (last: number) => {
      const g = game.current;
      const step = (now: number) => {
        if (!g.running) return;
        const dt = Math.min(34, now - last);
        last = now;
        const b = g.ball;

        // the paddle eases toward the pointer instead of snapping to it
        g.paddleX += (g.target - g.paddleX) * Math.min(1, dt / 90);

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const rx = b.r / g.w;
        const ry = b.r / g.h;
        if (b.x < rx) {
          b.x = rx;
          b.vx = Math.abs(b.vx);
        }
        if (b.x > 1 - rx) {
          b.x = 1 - rx;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y < ry) {
          b.y = ry;
          b.vy = Math.abs(b.vy);
        }

        const paddleW = Math.max(74, g.w * 0.13) / g.w;
        const paddleY = (g.h - 26) / g.h;
        if (b.vy > 0 && b.y + ry >= paddleY && b.y < paddleY + 0.06) {
          const offset = (b.x - g.paddleX) / (paddleW / 2);
          if (Math.abs(offset) <= 1.15) {
            b.y = paddleY - ry;
            b.vy = -Math.abs(b.vy) * 1.025;
            b.vx += offset * 0.0022;
            b.vx = Math.max(-0.011, Math.min(0.011, b.vx));
            g.rallies += 1;
            setScore(g.rallies);
          }
        }

        if (b.y > 1.08) {
          stop(true);
          draw();
          return;
        }

        draw();
        g.raf = requestAnimationFrame(step);
      };
      g.raf = requestAnimationFrame(step);
    },
    [draw, stop],
  );

  const start = useCallback(() => {
    reset();
    const g = game.current;
    g.running = true;
    setState("playing");
    loop(performance.now());
  }, [loop, reset]);

  // size the canvas to its box and to the display's pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      game.current.w = rect.width;
      game.current.h = rect.height;
      // Setting an unchanged size would restart the observer for nothing.
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  // never run off screen or in a hidden tab
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver((entries) => {
      game.current.visible = entries.some((e) => e.isIntersecting);
      if (!game.current.visible && game.current.running) stop(false);
    });
    io.observe(wrap);
    const onHide = () => {
      if (document.hidden && game.current.running) stop(false);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onHide);
      cancelAnimationFrame(game.current.raf);
    };
  }, [stop]);

  const aim = (clientX: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    game.current.target = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const g = game.current;
    if (e.key === "ArrowLeft" || e.key === "a") {
      g.target = Math.max(0, g.target - 0.08);
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "d") {
      g.target = Math.min(1, g.target + 0.08);
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      if (state !== "playing") start();
      e.preventDefault();
    }
  };

  return (
    <section className={s.gameSection} id="game" data-name="Game">
      <div className={s.gameWrapper}>
        <Label title={label} />
        <div className={s.gameHead}>
          <h2 className={`${text.t} ${text.h1}`}>{heading}</h2>
          <p className={`${text.t} ${text.body18} ${s.gameBody}`}>{body}</p>
        </div>

        <div
          ref={wrapRef}
          className={s.gameBoard}
          role="application"
          aria-label="Keep the orb up: a small game"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerMove={(e) => aim(e.clientX)}
          onPointerDown={(e) => {
            aim(e.clientX);
            if (state !== "playing") start();
          }}
        >
          <canvas ref={canvasRef} className={s.gameCanvas} />

          {state !== "playing" && (
            <div className={s.gameOverlay}>
              <button type="button" className={s.gameButton} onClick={start}>
                {state === "over" ? "Again" : "Play"}
              </button>
              <p className={`${text.t} ${text.mono}`}>{state === "over" ? `${score} rallies` : hint}</p>
            </div>
          )}

          <div className={s.gameScore}>
            <span className={`${text.t} ${text.mono}`}>Rallies {String(score).padStart(2, "0")}</span>
            <span className={`${text.t} ${text.mono}`}>Best {String(best).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
