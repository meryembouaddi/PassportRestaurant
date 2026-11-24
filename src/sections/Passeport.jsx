import { useState } from "react";
import { destinations } from "../data/destinations";

const storageKey = "passport-stamps";

function readStamps() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!Array.isArray(saved)) return [];
    return destinations
      .map((country) => country.code)
      .filter((code) => saved.includes(code));
  } catch {
    return [];
  }
}

export default function Passeport() {
  const [stamps, setStamps] = useState(readStamps);

  function save(next) {
    setStamps(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* Le carnet reste utilisable si le navigateur bloque le stockage. */
    }
  }

  return (
    <section id="passeport" className="wrap">
      <small>Démonstration interactive</small>
      <h2>
        Mon <em>passeport.</em>
      </h2>
      <p>Choisissez une escale pour ajouter son tampon à votre carnet.</p>
      <div className="book">
        <div className="bookTitle">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="16" />
            <ellipse cx="20" cy="20" rx="7" ry="16" />
            <path d="M4 20h32M7 11q13 7 26 0M7 29q13-7 26 0" />
          </svg>
          <strong>Carnet de voyage</strong>
          <span aria-live="polite">
            {stamps.length} / {destinations.length} escales
          </span>
        </div>
        <div className="stamps">
          {destinations.map(({ code, name }) => {
            const visited = stamps.includes(code);
            return (
              <button
                key={code}
                disabled={visited}
                onClick={() => save([...stamps, code])}
                aria-label={"Tamponner " + name}
              >
                <b>{code}</b>
                <span>{name}</span>
                <small>{visited ? "Visité" : "Tamponner"}</small>
              </button>
            );
          })}
        </div>
        {stamps.length > 0 && (
          <button className="reset" onClick={() => save([])}>
            Effacer mes tampons
          </button>
        )}
      </div>
    </section>
  );
}
