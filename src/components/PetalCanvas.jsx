import { useEffect, useRef } from 'react';

/**
 * Lightweight romantic flower petal canvas particle system.
 * Generates delicate blush and rose-gold petals drifting in a gentle breeze.
 */
export default function PetalCanvas({ count = 18, speed = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle petal colors: blush rose, warm cream, soft peach, antique gold tint
    const petalColors = [
      'rgba(247, 219, 217, 0.65)',
      'rgba(242, 203, 202, 0.55)',
      'rgba(255, 238, 235, 0.70)',
      'rgba(224, 187, 166, 0.45)',
      'rgba(198, 163, 107, 0.35)'
    ];

    const petals = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: (Math.random() * 0.8 + 0.4) * speed,
      speedX: (Math.random() * 0.6 - 0.2) * speed,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      sway: Math.random() * 2 * Math.PI,
      swaySpeed: Math.random() * 0.02 + 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.8 + p.speedX;
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

        // Draw organic petal shape (curved ellipse)
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
      cancelAnimationFrame(animationFrameId);
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
