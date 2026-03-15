/**
 * Scroll reveal — staggered siblings on IntersectionObserver.
 * Targets all `.r` elements. Call once after mount.
 */
export function initScrollReveal() {
  const els = document.querySelectorAll('.r');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const siblings = [...e.target.parentElement.querySelectorAll('.r')];
        const i = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('on'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
  return () => obs.disconnect();
}
