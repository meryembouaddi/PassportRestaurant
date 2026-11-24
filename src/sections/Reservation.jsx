import { useRef, useState } from "react";
import { emailConfigured, sendMessage } from "../services/email";

const localClock = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Africa/Casablanca", year: "numeric", month: "2-digit",
  day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

export default function Reservation() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const sending = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (!emailConfigured || sending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = values.get("name").trim();
    const date = values.get("date");
    const time = values.get("time");
    if (!name) {
      setStatus("Indiquez votre nom pour la réservation.");
      form.elements.name.focus();
      return;
    }
    if (date + " " + time <= localClock.format(new Date())) {
      setStatus("Choisissez une date et une heure à venir, à l’heure d’Agadir.");
      form.elements.date.focus();
      return;
    }

    const day = date.split("-").reverse().join("/");
    const guests = values.get("guests");
    const message = [
      "Demande de réservation PASSPORT",
      "Nom : " + name,
      "Date souhaitée : " + day,
      "Heure à Agadir : " + time,
      "Nombre de personnes : " + guests,
      "Adresse de réponse : " + values.get("email"),
    ].join("\n");

    sending.current = true;
    setBusy(true);
    setStatus("Envoi de la demande…");
    try {
      await sendMessage({ from_name: name, reply_to: values.get("email"),
        rating: "Réservation", message });
      form.reset();
      setStatus("Demande envoyée pour le " + day + " à " + time + " (" + guests +
        " pers.). Votre table sera réservée après confirmation de l’équipe par e-mail.");
    } catch {
      setStatus("Envoi non confirmé. Vos informations restent dans le formulaire.");
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  return (
    <section id="reservation" className="wrap contact">
      <div>
        <small>Réservation</small>
        <h2>Réserver <em>une table.</em></h2>
        <p>Indiquez quand vous souhaitez venir et combien vous serez.
          L’équipe PASSPORT vérifiera la disponibilité et vous répondra par e-mail.</p>
      </div>
      <form onSubmit={submit}>
        <fieldset disabled={busy}>
          <legend>Votre demande de réservation</legend>
          <label>Nom de la réservation<input name="name" autoComplete="name" maxLength={100} required /></label>
          <label>Adresse e-mail<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          <label>Date souhaitée<input name="date" type="date" min={localClock.format(new Date()).slice(0,10)} required /></label>
          <label>Heure souhaitée à Agadir<input name="time" type="time" required /></label>
          <label>Nombre de personnes<input name="guests" type="number" min="1" step="1" defaultValue="2" required /></label>
          {!emailConfigured && <p>La messagerie de réservation est indisponible.</p>}
          <button type="submit" disabled={busy || !emailConfigured}>
            {busy ? "Envoi en cours…" : "Demander la réservation"}
          </button>
        </fieldset>
        <p role="status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}
