import { useState } from "react";
import { destinations } from "../data/destinations";

export default function Escales() {
  const [selected, setSelected] = useState(destinations[0]);
  return (
    <section id="escales" className="wrap">
      <small>Atlas culinaire</small>
      <h2>
        Les quatre <em>escales.</em>
      </h2>
      <div className="tickets">
        {destinations.map((country) => (
          <button
            className="ticket"
            key={country.code}
            aria-pressed={selected.code === country.code}
            onClick={() => setSelected(country)}
          >
            <span className="ticketTop">
              Destination<b>{country.code}</b>
            </span>
            <strong>{country.name}</strong>
            <span>{country.cuisine}</span>
          </button>
        ))}
      </div>
      <div className="detail" aria-live="polite">
        <div>
          <small>Exemple de dégustation · {selected.name}</small>
          <h3>{selected.dish}</h3>
        </div>
        <p>{selected.description}</p>
      </div>
    </section>
  );
}
