const ITEMS = [
  'Frontend Development',
  'UI / UX Design',
  'React',
  'Electronics & Robotics',
  'AI-Native',
  'CHARUSAT',
];

// Double the items for seamless loop
const ALL = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee-band">
      <div className="marquee-inner">
        {ALL.map((item, i) => (
          <span className="m-item" key={i}>
            {item}<span className="m-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
