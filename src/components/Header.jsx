import { useState } from "react";
import Brand from "./Brand";

const links = [
  ["Le concept", "#concept"],
  ["Les escales", "#escales"],
  ["Le projet", "#projet"],
  ["Contact et avis", "#contact"],
  ["Mon passeport", "#passeport"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <Brand />
      <button
        className="mobile"
        aria-controls="navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>
      <nav id="navigation" className={open ? "open" : ""}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
