import { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const PARTICLE_COUNT = 55;
    const MAX_DIST = 140;
    const SPEED = 0.28;
    const particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function makeParticle() {
      return {
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED, SPEED),
        r: rand(1, 1.8),
      };
    }

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());

    function getColor() {
      // Read the current fg CSS var so it respects theme
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--fg').trim();
      return raw || '#FFFDDB';
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const col = getColor();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.35;
        ctx.fill();

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = col;
            ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.1;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
