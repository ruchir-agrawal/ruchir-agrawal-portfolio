import { thoughts } from '../data/thoughts';

export default function Thinking() {
  return (
    <section id="thinking">
      <div className="sh r">
        <div>
          <div className="sh-label">Digital Garden</div>
          <h2 className="sh-title">Thinking</h2>
        </div>
        <div className="sh-count">Intentional / Dispatches</div>
      </div>

      <div className="th-grid">
        {thoughts.map((thought, idx) => (
          <div key={thought.id} className={`th-card r delay-${idx}`}>
            <div className="th-header">
              <span className="th-date">{thought.date}</span>
              <span className="th-tag">{thought.tag}</span>
            </div>
            <p className="th-content">{thought.content}</p>
            <div className="th-footer">
              <div className="th-dot" />
              <span className="th-status">Published</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
