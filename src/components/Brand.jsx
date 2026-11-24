import logo from "../assets/logo-passport.jpg";

export default function Brand() {
  return (
    <a className="brand" href="#accueil" aria-label="PASSPORT — Accueil">
      <img src={logo} alt="Passport, restaurant sans frontières" />
    </a>
  );
}
