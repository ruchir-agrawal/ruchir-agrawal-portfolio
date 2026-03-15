/**
 * Word-by-word reveal — wraps text nodes in .word-reveal elements
 * into individual <span class="word"> elements, then reveals them
 * staggered via IntersectionObserver.
 */
function wrapWords(el) {
  const text = el.textContent.trim();
  el.innerHTML = text.split(/\s+/).map(w => `<span class="word">${w}</span>`).join(' ');
}

export function initWordReveal() {
  const els = document.querySelectorAll('.word-reveal');
  if (!els.length) return;

  els.forEach(el => wrapWords(el));

  const wordObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const words = entry.target.querySelectorAll('.word');
      words.forEach((w, i) => {
        setTimeout(() => w.classList.add('show'), i * 55);
      });
      wordObs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  els.forEach(el => wordObs.observe(el));
  return () => wordObs.disconnect();
}
