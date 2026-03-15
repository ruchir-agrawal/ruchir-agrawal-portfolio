const stats = [
  { n: '3+', l: 'Projects Shipped' },
  { n: 'IT', l: 'B.Tech @ CHARUSAT' },
  { n: 'UI', l: 'Primary Focus' },
  { n: 'AI', l: 'Daily Toolkit' },
];

export default function About() {
  return (
    <section id="about">
      <div className="sh r">
        <div>
          <div className="sh-label">Who I Am</div>
          <div className="sh-title">About</div>
        </div>
      </div>

      <div className="about-wrap">
        <div className="about-big r">
          Build<br />With<br /><span className="ghost">Intent</span>
        </div>

        <div className="about-r r">
          <p>
            I'm <strong>Ruchir Agrawal</strong>, a B.Tech IT student at{' '}
            <strong>Charotar University of Science and Technology (CHARUSAT)</strong>, Gujarat.
          </p>
          <p>
            My work lives where design thinking meets real problems. Whether it's a platform that
            respects a student's individuality, or a car navigating obstacles on its own — I care
            about <strong>why</strong> things are built, not just how.
          </p>
          <p>
            I stay deeply engaged with the AI landscape. The builders who'll thrive next are those
            who learn to <strong>think alongside AI</strong> — not just use it as a shortcut.
          </p>

          <div className="stats">
            {stats.map((s) => (
              <div key={s.l} className="stat-box">
                <div className="stat-n">{s.n}</div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
