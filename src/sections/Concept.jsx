import table from "../assets/table.jpg";

export default function Concept() {
  return (
    <section id="concept" className="concept">
      <img
        src={table}
        alt="Repas partagé, poulet rôti et assortiments de petits plats"
      />
      <div>
        <small>Le concept</small>
        <h2>
          Une table, <em>quatre cultures.</em>
        </h2>
        <p>
          Une famille choisit le Maroc, un ami préfère le Japon. PASSPORT
          imagine un lieu où chacun explore sa cuisine tout en partageant le
          même repas.
        </p>
        <p>
          À chaque escale, la carte et l’atmosphère s’inspirent du pays. Un
          tampon dans le passeport garde la trace de la découverte et invite à
          revenir.
        </p>
      </div>
    </section>
  );
}
