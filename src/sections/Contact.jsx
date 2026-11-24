import { useRef, useState } from "react";
import { emailConfigured, sendMessage } from "../services/email";

export default function Contact() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const sending = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending.current || !emailConfigured) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const message = fields.get("message").trim();
    if (!message) {
      setStatus("Écrivez votre message avant de l’envoyer.");
      form.elements.message.focus();
      return;
    }

    sending.current = true;
    setBusy(true);
    setStatus("Envoi en cours…");
    try {
      await sendMessage({
        from_name: fields.get("from_name").trim() || "Visiteur",
        reply_to: fields.get("reply_to").trim(),
        rating: fields.get("rating") || "Sans note",
        message,
      });
      form.reset();
      setStatus("Merci ! Votre message a été envoyé à l’équipe PASSPORT.");
    } catch {
      setStatus(
        "L’envoi n’a pas pu être confirmé. Votre texte est conservé dans le formulaire.",
      );
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="wrap contact">
      <div>
        <small>Contact et avis</small>
        <h2>
          Votre <em>avis.</em>
        </h2>
        <p>
          Une question sur le projet ou une idée pour notre prochaine escale ?
          Écrivez à l’équipe PASSPORT. Votre message lui sera adressé en privé.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={busy}>
          <legend>Écrire à PASSPORT</legend>
          <label>
            Votre nom (facultatif)
            <input name="from_name" autoComplete="name" maxLength={100} />
          </label>
          <label>
            Votre adresse e-mail
            <input
              name="reply_to"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          <label>
            Votre note sur le concept (facultatif)
            <select name="rating" defaultValue="">
              <option value="">Sans note</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n + " / 5"}>
                  {n} / 5
                </option>
              ))}
            </select>
          </label>
          <label>
            Votre message
            <textarea name="message" rows={5} maxLength={3000} required />
          </label>
          {!emailConfigured && (
            <p className="contact-note">
              L’envoi sera disponible après la connexion de la messagerie.
            </p>
          )}
          <button type="submit" disabled={!emailConfigured || busy}>
            {busy ? "Envoi en cours…" : "Envoyer mon message"}
          </button>
        </fieldset>
        <p role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
