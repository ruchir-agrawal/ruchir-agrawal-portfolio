import { projects } from '../data/projects';
import { WigglingCards } from './WigglingCards';

export default function Projects() {
  return (
    <section id="projects" className="!px-0">
      <div className="sh r !px-[52px]">
        <div>
          <div className="sh-label">Selected Work</div>
          <div className="sh-title">Projects</div>
        </div>
        <div className="sh-count">{String(projects.length).padStart(2, '0')} Total</div>
      </div>

      <div className="r">
        <WigglingCards projects={projects} />
      </div>
    </section>
  );
}
