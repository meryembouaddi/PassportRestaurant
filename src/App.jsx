import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Escales from "./sections/Escales";
import Concept from "./sections/Concept";
import Passeport from "./sections/Passeport";
import Projet from "./sections/Projet";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Escales />
        <Concept />
        <Passeport />
        <Projet />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
