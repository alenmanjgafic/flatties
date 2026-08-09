import type { Metadata } from "next";
import Link from "next/link";
import LegalPageV4 from "@/components/v4/LegalPageV4";

export const metadata: Metadata = {
  title: "Datenschutz — Flatties | St. Gallen",
  description:
    "Datenschutzerklärung von Flatties, St. Gallen: welche Daten wir wofür bearbeiten und welche Rechte Sie haben.",
};

export default function DatenschutzPage() {
  return (
    <LegalPageV4 title="Datenschutz">
      <p>
        Wir bearbeiten Personendaten nach dem Schweizer Datenschutzgesetz
        (revDSG). Diese Erklärung beschreibt, welche Daten beim Besuch von
        flatties.ch anfallen, wofür wir sie verwenden und welche Rechte Sie
        haben. Kurz gesagt: Wir sammeln so wenig wie möglich — keine
        Werbe-Cookies, kein Tracking.
      </p>

      <h2>Verantwortliche Stelle</h2>
      <p>
        Flatties Schweiz GmbH, St.&nbsp;Leonhard-Strasse 45, 9000
        St.&nbsp;Gallen, Schweiz. Für Datenschutzanliegen erreichen Sie uns
        unter <a href="mailto:info@flatties.ch">info@flatties.ch</a>. Weitere
        Angaben finden Sie im <Link href="/impressum">Impressum</Link>.
      </p>

      <h2>Hosting und Server-Logdaten</h2>
      <p>
        Diese Website wird bei Vercel Inc. (USA) gehostet und über deren
        weltweites Netzwerk ausgeliefert. Beim Aufruf der Website fallen
        technisch bedingt Verbindungsdaten an (u.&nbsp;a. IP-Adresse,
        Zeitpunkt, aufgerufene Seite, Browsertyp). Diese Daten sind für den
        sicheren Betrieb der Website erforderlich und werden nicht mit anderen
        Daten verknüpft.
      </p>

      <h2>Kontaktformular</h2>
      <p>
        Wenn Sie unser Kontaktformular nutzen, bearbeiten wir die von Ihnen
        angegebenen Daten (Name, E-Mail-Adresse, Anfragetyp, Nachricht)
        ausschliesslich zur Beantwortung Ihrer Anfrage. Die Anfrage wird uns
        per E-Mail an <a href="mailto:info@flatties.ch">info@flatties.ch</a>{" "}
        zugestellt; für den Versand setzen wir etablierte E-Mail-Dienste ein.
        Zum Schutz vor Missbrauch führt der Server automatisierte technische
        Prüfungen durch, unter anderem eine kurzzeitige, IP-basierte
        Begrenzung der Anfragehäufigkeit; die IP-Adresse wird dabei nicht
        dauerhaft gespeichert. Wir bewahren Anfragen so lange auf, wie es für
        die Bearbeitung nötig ist.
      </p>

      <h2>Google Maps</h2>
      <p>
        Zur Anzeige unseres Standorts betten wir eine Karte von Google Maps
        (Google Ireland Ltd. bzw. Google LLC, USA) ein. Beim Laden der Karte
        stellt Ihr Browser eine Verbindung zu Google her; dabei wird
        u.&nbsp;a. Ihre IP-Adresse an Google übertragen und Google kann eigene
        Cookies setzen. Es gilt die{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>Google-Rezensionen</h2>
      <p>
        Die auf der Website angezeigten Bewertungen rufen wir serverseitig
        über die Google Places API ab. Dabei werden keine Daten von
        Website-Besuchern an Google übermittelt.
      </p>

      <h2>TikTok-Inhalte</h2>
      <p>
        Vorschaubilder unserer TikTok-Beiträge liefern wir über unseren
        eigenen Server aus — Ihr Browser stellt beim Betrachten unserer
        Website keine Verbindung zu TikTok her, und es werden keine
        TikTok-Cookies gesetzt. Erst wenn Sie einen Beitrag anklicken,
        gelangen Sie auf tiktok.com; ab dann gilt die{" "}
        <a
          href="https://www.tiktok.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von TikTok
        </a>
        .
      </p>

      <h2>Bestellplattformen</h2>
      <p>
        Bestellungen laufen über die externen Plattformen Uber Eats und Just
        Eat; dort gelten deren eigene Datenschutzbestimmungen. Auf unserer
        Website zählen wir lediglich anonym, welche Plattform gewählt wurde
        (Plattform und Zeitpunkt, ohne Personenbezug), um unser Angebot zu
        verbessern.
      </p>

      <h2>Spracheinstellung, Cookies</h2>
      <p>
        Ihre Sprachwahl (Deutsch/Englisch) speichern wir lokal in Ihrem
        Browser (localStorage). Wir setzen keine eigenen Cookies und keine
        Analyse- oder Werbetools ein.
      </p>

      <h2>Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft über die von uns bearbeiteten
        Personendaten sowie auf deren Berichtigung, Herausgabe oder Löschung,
        soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        Wenden Sie sich dazu an{" "}
        <a href="mailto:info@flatties.ch">info@flatties.ch</a>.
      </p>

      <h2>Änderungen</h2>
      <p>
        Wir können diese Datenschutzerklärung bei Bedarf anpassen; es gilt die
        jeweils hier veröffentlichte Fassung.
        <br />
        Stand: August 2026
      </p>
    </LegalPageV4>
  );
}
