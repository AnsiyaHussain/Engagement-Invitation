import { useEffect, useRef } from 'react';

/**
 * PetalShower
 * Lightweight, 60fps HTML5 Canvas petal shower.
 * Delicate falling blush-pink and champagne rose petals with gentle 3D flutter.
 * Zero external libraries, low particle count (18-28), no scroll lag.
 */
export default function PetalShower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Palette: soft blush pinks, gentle rose, and warm champagne petals
    const COLORS = [
      '#F4B5C4', // Soft blush
      '#E8809A', // Delicate rose
      '#F9D3DB', // Pale blush
      '#E9C27A', // Muted champagne gold
      '#C8506E', // Rose accent
      '#FBE4E4', // Light pink
    ];

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const R = Math.random;

    const createPetal = (initialY = false) => ({
      x: R() * width,
      y: initialY ? R() * height : -30,
      s: (6 + R() * 9) * dpr, // small, delicate sizes (6px - 15px)
      vy: (0.45 + R() * 0.75) * dpr, // slow, graceful descent
      vx: (R() - 0.5) * 0.45 * dpr, // gentle side drifting
      r: R() * Math.PI * 2, // rotation angle
      vr: (R() - 0.5) * 0.028, // slow angular velocity
      ph: R() * Math.PI * 2, // phase for 3D flip flutter
      c: COLORS[(R() * COLORS.length) | 0],
      a: 0.5 + R() * 0.35, // soft opacity
    });

    const resize = () => {
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      // Keep count LOW: ~18 on mobile, ~26 on desktop
      const count = window.innerWidth < 640 ? 18 : 26;
      particles = Array.from({ length: count }, () => createPetal(true));
    };

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      // Realistic 3D flutter using vertical squash
      ctx.scale(1, Math.abs(Math.cos(p.ph)) * 0.65 + 0.35);
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;

      const s = p.s;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.95, -s * 0.55, s * 0.8, s * 0.75, 0, s);
      ctx.bezierCurveTo(-s * 0.8, s * 0.75, -s * 0.95, -s * 0.55, 0, -s);
      ctx.fill();

      // Delicate subtle central vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = dpr;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.lineTo(0, s * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.ph) * 0.55 * dpr;
        p.ph += 0.022;
        p.r += p.vr;

        // Reset once fallen off bottom
        if (p.y > height + 30) {
          particles[i] = createPetal(false);
        }
        drawPetal(p);
      });
      animationFrameId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      // Draw static petals once without animation loop
      particles.slice(0, 8).forEach(drawPetal);
    } else {
      loop();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      id="p"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  );
}

