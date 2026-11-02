import { useEffect, useRef } from 'react';

/**
 * High-performance, GPU-friendly flower petal canvas particle system.
 * Features:
 * - IntersectionObserver: pauses rAF when offscreen (zero CPU/GPU drain when out of view).
 * - prefers-reduced-motion check for accessibility.
 * - Auto particle reduction on mobile for smooth 60fps.
 */
export default function PetalCanvas({ count = 16, speed = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check reduced motion accessibility
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Responsive particle count: lighter on mobile screens
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? Math.min(count, 9) : count;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause when offscreen
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationFrameId) {
              render();
            }
          });
        },
        { rootMargin: '50px' }
      );
      observer.observe(canvas);
    }

    // Subtle petal colors: blush rose, warm cream, soft peach, antique gold tint
    const petalColors = [
      'rgba(247, 219, 217, 0.60)',
      'rgba(242, 203, 202, 0.50)',
      'rgba(255, 238, 235, 0.65)',
      'rgba(224, 187, 166, 0.40)',
      'rgba(198, 163, 107, 0.30)'
    ];

    const petals = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: (Math.random() * 0.7 + 0.35) * speed,
      speedX: (Math.random() * 0.5 - 0.15) * speed,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      sway: Math.random() * 2 * Math.PI,
      swaySpeed: Math.random() * 0.02 + 0.01
    }));

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.7 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset if drifted beyond bottom or sides
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Draw organic curved petal
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, 0);
        ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, p.size, 0, p.size);
        ctx.bezierCurveTo(-p.size / 2, p.size, -p.size / 2, 0, 0, 0);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="petals-canvas"
      aria-hidden="true"
    />
  );
}
