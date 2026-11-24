export default function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="heroCopy">
        <div className="eyebrow">
          <i />
          Restaurant sans frontières
        </div>
        <h1>
          Le goût du
          <br />
          <em>voyage.</em>
        </h1>
        <p>
          Quatre cultures culinaires réunies à une même table, au cœur d’un
          projet de restaurant à Agadir.
        </p>
        <a className="cta" href="#escales">
          Explorer les escales
        </a>
      </div>
      <div className="heroFoot">
        <span>AGADIR, MAROC</span>
        <span>PROJET ENTREPRENEURIAL / 2026</span>
      </div>
    </section>
  );
}
