const skills = [
  {
    abbr: 'UI',
    name: 'UI / UX Design',
    desc: 'User flows, wireframes, and visual systems built with a strong eye for usability and clarity.',
  },
  {
    abbr: 'FE',
    name: 'Frontend Dev',
    desc: 'Responsive, performant interfaces using HTML, CSS, JavaScript, and React.',
  },
  {
    abbr: 'HW',
    name: 'Electronics',
    desc: 'Hands-on with embedded systems, sensors, motor drivers, and autonomous robotics builds.',
  },
  {
    abbr: 'AI',
    name: 'AI-Native',
    desc: 'Actively exploring new models and tools — from Claude to Cursor — as the landscape shifts daily.',
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="sh r">
        <div>
          <div className="sh-label">Capabilities</div>
          <div className="sh-title">Skills</div>
        </div>
        <div className="sh-count">
          {String(skills.length).padStart(2, '0')} Areas
        </div>
      </div>

      <div className="sk-grid r">
        {skills.map((skill) => (
          <div key={skill.abbr} className="sk-cell">
            <div className="sk-abbr">{skill.abbr}</div>
            <div className="sk-name">{skill.name}</div>
            <div className="sk-desc">{skill.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
