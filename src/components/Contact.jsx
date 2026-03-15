export default function Contact() {
  const email = '25it001@charusat.edu.in';
  const mailtoHref = `mailto:${email}`;

  return (
    <section id="contact">
      <div className="ct-label r">Get in touch</div>

      <div className="ct-big r">
        Let&apos;s Build<br />Something.
      </div>

      <div className="ct-bottom r">
        <div className="ct-links">
          <a
            href="https://github.com/ruchir-agrawal"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-link"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ruchir-agrawal-b257a4374/"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-link"
          >
            LinkedIn
          </a>
          <a href={mailtoHref} className="ct-link">Email</a>
        </div>
        <div className="ct-copy">© 2026 Ruchir Agrawal</div>
      </div>
    </section>
  );
}
