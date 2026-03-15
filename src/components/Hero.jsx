import ParticleField from './ParticleField';

export default function Hero() {
  return (
    <section id="hero">
      {/* Particle constellation background */}
      <ParticleField />

      {/* Ghost background text */}
      <div className="hero-ghost" aria-hidden="true">RUCHIR</div>

      <div className="hero-content">
        {/* Left: Name */}
        <div>
          <div className="hero-eyebrow">
            <span className="hero-line-wrap">
              <span className="hero-line-inner d1">B.Tech IT · CHARUSAT · Gujarat</span>
            </span>
          </div>
          <div className="hero-name">
            <span className="hero-line-wrap">
              <span className="hero-line-inner d2">Ruchir</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line-inner d3 ghost-text">Agrawal</span>
            </span>
          </div>
        </div>

        {/* Right: Role + CTA */}
        <div>
          <div className="hero-next-label">
            <span className="hero-line-wrap">
              <span className="hero-line-inner d3">Currently</span>
            </span>
          </div>
          <div className="hero-role">
            <span className="hero-line-wrap">
              <span className="hero-line-inner d4">Frontend Dev &amp; UI/UX Designer</span>
            </span>
          </div>
          <div className="hero-sub">
            <span className="hero-line-wrap">
              <span className="hero-line-inner d5">⬤ Open to work &nbsp;&nbsp; ◎ Gujarat, India</span>
            </span>
          </div>
          <span className="hero-line-wrap" style={{ display: 'inline-block', marginTop: '32px' }}>
            <span className="hero-line-inner d5" style={{ display: 'inline-block' }}>
              <a href="#projects" className="btn">View Work</a>
            </span>
          </span>
        </div>
      </div>

      {/* MindJoin-style scroll indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
