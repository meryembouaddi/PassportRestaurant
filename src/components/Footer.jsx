import Brand from "./Brand";
import { contact } from "../data/contact";
import "../styles/footer.css";

const pages = [
  ["Le concept", "#concept"],
  ["Les quatre escales", "#escales"],
  ["Mon passeport", "#passeport"],
  ["Laisser un avis", "#contact"],
];

function profileUrl(value, domain) {
  const profile = value.trim();
  if (!profile) return null;

  // Accepte un identifiant comme @passport ou un lien de profil complet.
  if (/^@[a-z0-9._]+$/i.test(profile)) {
    const handle = profile.slice(1);
    const prefix = domain === "tiktok.com" ? "@" : "";
    return `https://www.${domain}/${prefix}${handle}`;
  }

  try {
    const url = new URL(profile);
    const validDomain = [domain, `www.${domain}`].includes(url.hostname);

    if (url.protocol === "https:" && validDomain && url.pathname.length > 1) {
      return url.href;
    }
  } catch {
    return null;
  }

  return null;
}

export default function Footer() {
  const digits = contact.whatsappNumber.replace(/[\s()+.-]/g, "");
  const whatsappUrl = /^[1-9]\d{6,14}$/.test(digits)
    ? `https://wa.me/${digits}`
    : null;

  const networks = [
    ["Instagram", profileUrl(contact.instagramUrl, "instagram.com")],
    ["TikTok", profileUrl(contact.tiktokUrl, "tiktok.com")],
    ["WhatsApp", whatsappUrl],
  ];

  return (
    <footer className="passport-footer">
      <div className="passport-footer__columns">
        <div>
          <Brand />
          <p>
            Restaurant sans frontières
            <br />
            Agadir, Maroc
          </p>
        </div>

        <div>
          <h2>Explorer PASSPORT</h2>

          <ul>
            {pages.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Restons en contact</h2>

          <a
            className="passport-footer__email"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>

          <ul className="passport-footer__social">
            {networks.map(([name, href]) => (
              <li key={name}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                ) : (
                  <span>
                    {name} <small>À venir</small>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="passport-footer__bottom">
        <span>© {new Date().getFullYear()} PASSPORT</span>
        <a href="#accueil">Retour en haut</a>
      </div>
    </footer>
  );
}