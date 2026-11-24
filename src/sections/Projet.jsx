import { project } from "../data/project";

export default function Projet() {
  return (
    <section id="projet" className="wrap dossier">
      <div>
        <small>Dossier de soutenance</small>
        <h2>
          Le <em>projet.</em>
        </h2>
        <a
          className="pdf"
          href={import.meta.env.BASE_URL + "soutenance.pdf"}
          target="_blank"
          rel="noopener"
        >
          Consulter le dossier PDF
        </a>
      </div>
      <div>
        {project.map(({ title, description }) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
