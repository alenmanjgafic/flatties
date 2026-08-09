import type { Metadata } from "next";
import Link from "next/link";
import LegalPageV4 from "@/components/v4/LegalPageV4";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen — Flatties | St. Gallen",
  description: "Nutzungsbedingungen der Website flatties.ch.",
};

export default function NutzungsbedingungenPage() {
  return (
    <LegalPageV4 title="Nutzungs&shy;bedingungen">
      <h2>Geltungsbereich</h2>
      <p>
        Diese Bedingungen gelten für die Nutzung der Website flatties.ch,
        betrieben von der Flatties Schweiz GmbH, St.&nbsp;Leonhard-Strasse 45,
        9000 St.&nbsp;Gallen (siehe <Link href="/impressum">Impressum</Link>).
        Mit dem Aufruf der Website erklären Sie sich mit diesen Bedingungen
        einverstanden.
      </p>

      <h2>Zweck der Website</h2>
      <p>
        Die Website informiert über unser Restaurant, unser Menü und unseren
        Standort. Bestellungen werden über externe Plattformen (Uber Eats,
        Just Eat) abgewickelt; für diese gelten die Bedingungen der jeweiligen
        Plattform. Über das Kontaktformular können Sie Anfragen an uns
        richten.
      </p>

      <h2>Inhalte und Urheberrecht</h2>
      <p>
        Alle Inhalte dieser Website (Texte, Bilder, Logos, Gestaltung) sind
        Eigentum der Flatties Schweiz GmbH oder entsprechend lizenziert und
        urheberrechtlich geschützt. Eine Verwendung ausserhalb des privaten
        Gebrauchs bedarf unserer vorgängigen schriftlichen Zustimmung.
      </p>

      <h2>Zulässige Nutzung</h2>
      <p>
        Die Website darf nicht missbräuchlich genutzt werden — insbesondere
        nicht durch automatisierte Massenanfragen, Manipulationsversuche oder
        das Einschleusen schädlicher Inhalte über das Kontaktformular.
      </p>

      <h2>Verfügbarkeit und Haftung</h2>
      <p>
        Wir bemühen uns um einen unterbrechungsfreien Betrieb, übernehmen
        jedoch keine Gewähr für die ständige Verfügbarkeit der Website oder
        die Richtigkeit sämtlicher Angaben (z.&nbsp;B. Öffnungszeiten oder
        Menüpreise). Haftungsansprüche werden im gesetzlich zulässigen Rahmen
        ausgeschlossen. Für Inhalte verlinkter externer Websites sind deren
        Betreiber verantwortlich.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Der Umgang mit Personendaten ist in unserer{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link> beschrieben.
      </p>

      <h2>Anwendbares Recht</h2>
      <p>
        Es gilt schweizerisches Recht. Gerichtsstand ist St.&nbsp;Gallen,
        soweit gesetzlich zulässig.
        <br />
        Stand: August 2026
      </p>
    </LegalPageV4>
  );
}
