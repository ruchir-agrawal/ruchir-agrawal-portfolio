/**
 * Custom cursor — Smooth lerp follower with custom arrow shape.
 * Call initCursor() once after DOM is ready (in a React useEffect).
 * Returns a cleanup function.
 */
export function initCursor() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  // Position state for lerping
  let curX = window.innerWidth / 2, curY = window.innerHeight / 2; // Actual cursor element pos
  let ringX = curX, ringY = curY; // Ring pos
  let targetX = curX, targetY = curY; // Mouse pos
  
  let rafId;

  const onMove = (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    ring.classList.add('visible');
  };
  document.addEventListener('mousemove', onMove);

  // Smooth follow with lerp
  function updateLoop() {
    // Lerp cursor (faster follow)
    curX += (targetX - curX) * 0.18;
    curY += (targetY - curY) * 0.18;
    
    // Lerp ring (slower follow for trail effect)
    ringX += (targetX - ringX) * 0.08;
    ringY += (targetY - ringY) * 0.08;

    cur.style.transform = `translate(-5px, -5px) translate(${curX}px, ${curY}px)`;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    
    rafId = requestAnimationFrame(updateLoop);
  }
  updateLoop();

  // Interactive elements: grow/state changes
  const interactives = document.querySelectorAll(
    'a, button, .proj-row, .sk-cell, .stat-box, .wiggling-card'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('big');
      ring.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('big');
      ring.classList.remove('hovered');
    });
  });

  // Theme toggle: hide logic
  const toggleEl = document.getElementById('themeToggle');
  if (toggleEl) {
    toggleEl.addEventListener('mouseenter', () => {
      cur.classList.add('on-toggle');
      ring.classList.add('hidden-ring');
    });
    toggleEl.addEventListener('mouseleave', () => {
      cur.classList.remove('on-toggle');
      ring.classList.remove('hidden-ring');
    });
  }

  // Text cursor
  document.querySelectorAll('p, .p-desc, .manifest-body p').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('text-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('text-hover'));
  });

  // Cleanup
  return () => {
    document.removeEventListener('mousemove', onMove);
    cancelAnimationFrame(rafId);
  };
}
