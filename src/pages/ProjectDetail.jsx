import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <PageTransition>
      <div className="project-detail">
        <Link to="/" className="project-detail-back">
          ← Back to Work
        </Link>
        
        <div className="project-detail-num r">{project.num}</div>
        <h1 className="project-detail-name r">{project.name}</h1>

        <div className="project-detail-body">
          <div className="project-detail-l r">
            <section className="detail-section">
              <h4>The Vision</h4>
              <p className="project-detail-desc">{project.fullDescription}</p>
            </section>

            {project.deepDive && (
              <>
                <section className="detail-section">
                  <h4>The Problem</h4>
                  <p className="project-detail-desc">{project.deepDive.problem}</p>
                </section>
                <section className="detail-section">
                  <h4>The Solution</h4>
                  <p className="project-detail-desc">{project.deepDive.solution}</p>
                </section>
              </>
            )}
          </div>

          <div className="project-detail-meta r">
            <section className="detail-section">
              <h4>Tech Stack</h4>
              <div className="project-detail-tags">
                {project.techStack.map(tech => (
                  <span key={tech} className="p-tag">{tech}</span>
                ))}
              </div>
            </section>

            {project.deepDive && project.deepDive.challenges && (
              <section className="detail-section">
                <h4>Key Challenges</h4>
                <ul className="detail-list">
                  {project.deepDive.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.deepDive && project.deepDive.outcome && (
              <section className="detail-section">
                <h4>Execution Outcome</h4>
                <p className="detail-outcome">{project.deepDive.outcome}</p>
              </section>
            )}

            <section className="detail-section">
              <h4>Links</h4>
              <div className="project-detail-links">
                {project.links.map(link => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="project-detail-link">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
