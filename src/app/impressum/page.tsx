import type { Metadata } from "next";
import LegalPageV4 from "@/components/v4/LegalPageV4";

export const metadata: Metadata = {
  title: "Impressum — Flatties | St. Gallen",
  description: "Impressum und Anbieterkennzeichnung von Flatties, St. Gallen.",
};

export default function ImpressumPage() {
  return (
    <LegalPageV4 title="Impressum">
      <h2>Betreiberin der Website</h2>
      <p>
        Flatties Schweiz GmbH
        <br />
        St.&nbsp;Leonhard-Strasse 45
        <br />
        9000 St.&nbsp;Gallen
        <br />
        Schweiz
      </p>
      <p>
        E-Mail: <a href="mailto:info@flatties.ch">info@flatties.ch</a>
        <br />
        Restaurant: Marktgasse 2, 9000 St.&nbsp;Gallen
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>Marvin Rabahieh</p>

      <h2>Handelsregister / UID</h2>
      <p>
        Handelsregister-Nummer: CH-320.4.101.423-6
        <br />
        UID / MWST: CHE-438.708.569
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt.
        Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird
        jedoch keine Gewähr übernommen. Haftungsansprüche gegen die Betreiberin
        wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff
        auf die Website oder deren Nutzung entstehen, werden im gesetzlich
        zulässigen Rahmen ausgeschlossen.
      </p>

      <h2>Links auf externe Websites</h2>
      <p>
        Diese Website enthält Links auf Websites Dritter (z.&nbsp;B.
        Bestellplattformen und Social-Media-Profile). Für deren Inhalte sind
        ausschliesslich die jeweiligen Betreiber verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Sämtliche Inhalte dieser Website (Texte, Bilder, Logos, Gestaltung)
        sind urheberrechtlich geschützt. Jede Verwendung ausserhalb des
        privaten Gebrauchs bedarf der vorgängigen schriftlichen Zustimmung der
        Betreiberin.
      </p>
    </LegalPageV4>
  );
}
