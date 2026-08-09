export type Locale = "en" | "de";

export const translations = {
  nav: {
    about: { en: "About", de: "Über Uns" },
    menu: { en: "Menu", de: "Menü" },
    findUs: { en: "Find Us", de: "Standort" },
    orderNow: { en: "Order Now", de: "Jetzt Bestellen" },
  },
  hero: {
    tagline: {
      en: "Premium Street Food — St. Gallen",
      de: "Premium Street Food — St. Gallen",
    },
    subline: {
      en: "Best Smashburger in Town",
      de: "Best Smashburger in Town",
    },
    description: {
      en: "Selected premium ingredients. Freshly smashed. Unmistakable flavour in every bite.",
      de: "Ausgewählte Premium-Zutaten. Frisch gesmasht. Unverwechselbarer Geschmack in jedem Bissen.",
    },
    ctaMenu: { en: "Check the Menu", de: "Zum Menü" },
    ctaLocation: { en: "Find Us", de: "Standort" },
  },
  about: {
    tagline: { en: "Our Story", de: "Unsere Story" },
    title1: { en: "More Than", de: "Mehr Als" },
    title2: { en: "Just A Burger.", de: "Nur Ein Burger." },
    p1: {
      en: "Flatties isn't about simply selling burgers — we want to show how a real smashburger should taste.",
      de: "Bei Flatties geht es nicht darum, einfach Burger zu verkaufen, wir wollen zeigen, wie ein echter Smashburger schmecken sollte.",
    },
    p2: {
      en: "That's why we rely on selected premium ingredients, regional partners, original Martin's Potato Rolls from the USA and high-quality Angus beef, refined with Wagyu fat and sourced from our Hinterhofmetzger in Staad. All of it rounded off by carefully selected premium sauces.",
      de: "Deshalb setzen wir auf ausgewählte Premium-Zutaten, regionale Partner, originale Martin's Potato Rolls aus den USA sowie auf hochwertiges Fleisch aus Angus-Rind, veredelt mit Wagyu-Fett und bezogen von unserem Hinterhofmetzger aus Staad. Ergänzt wird das Ganze durch sorgfältig ausgewählte Premium-Saucen.",
    },
    p3full: {
      en: "Every burger is smashed fresh and prepared only after you order, so taste and quality take centre stage without compromise. We question every detail, keep refining our products and pursue one goal: creating the best possible overall experience — day after day, with consistently high standards of quality.",
      de: "Jeder Burger wird frisch gesmasht und erst nach deiner Bestellung zubereitet, damit Geschmack und Qualität kompromisslos im Mittelpunkt stehen. Wir hinterfragen jedes Detail, entwickeln unsere Produkte kontinuierlich weiter und verfolgen dabei nur ein Ziel: das bestmögliche Gesamterlebnis zu schaffen und das Tag für Tag mit gleichbleibend höchstem Qualitätsanspruch.",
    },
    p3pre: {
      en: "Our smashed patties come from ",
      de: "Unsere Smashed Patties kommen von der ",
    },
    p3hinterhof: {
      en: " — Angus beef refined with Wagyu fat, fully traceable and without compromise. Paired with the legendary ",
      de: " — Angus-Rind, veredelt mit Wagyu-Fett, rückverfolgbar und ohne Kompromisse. Dazu die legendären ",
    },
    p3potatorolls: {
      en: " and fresh drinks by ",
      de: " und frische Drinks von ",
    },
    p3end: {
      en: ". No shortcuts, only the finest ingredients.",
      de: ". Keine Abkürzungen, nur die besten Zutaten.",
    },
    quality: {
      tagline: {
        en: "The Difference Is in the Details",
        de: "Der Unterschied liegt im Detail",
      },
      title: {
        en: "Quality You Can Taste",
        de: "Qualität, die man schmeckt",
      },
      originTitle: {
        en: "100% Traceable Origin",
        de: "100% Nachvollziehbare Herkunft",
      },
      originText: {
        en: "Local Swiss meat from Hinterhofmetzger in Staad — selected quality, transparent origin and responsible processing.",
        de: "Fleisch lokal aus der Schweiz vom Hinterhofmetzger aus Staad — ausgewählte Qualität, transparente Herkunft und verantwortungsvolle Verarbeitung.",
      },
      beefTitle: { en: "Better Beef", de: "Besseres Fleisch" },
      beefText: {
        en: "Selected Angus beef, refined with premium Wagyu fat — for maximum juiciness, intense flavour and perfect texture.",
        de: "Ausgewähltes Angus-Rind, veredelt mit hochwertigem Wagyu-Fett — für maximale Saftigkeit, intensiven Geschmack und perfekte Textur.",
      },
      promiseTitle: { en: "No Compromises", de: "Keine Kompromisse" },
      promise1: { en: "No antibiotics", de: "Keine Antibiotika" },
      promise2: { en: "No factory farming", de: "Keine Massentierhaltung" },
      promise3: {
        en: "No growth promoters",
        de: "Keine Wachstumsförderer",
      },
      promise4: {
        en: "No preservatives",
        de: "Keine Konservierungsstoffe",
      },
      bunsTitle: { en: "Original Martin's Buns", de: "Original Martin's Buns" },
      bunsText: {
        en: "Original Martin's Potato Buns — imported directly from the USA. Soft, slightly sweet and unmatched in taste.",
        de: "Original Martin's Potato Buns — direkt aus den USA importiert. Weich, leicht süsslich und unvergleichlich im Geschmack.",
      },
      saucesTitle: { en: "Premium Sauces", de: "Premium Sauces" },
      saucesText: {
        en: "A curated selection of premium sauces — partly vegan, developed for maximum flavour.",
        de: "Eine kuratierte Auswahl an hochwertigen Premium-Saucen — teilweise vegan, entwickelt für maximalen Geschmack.",
      },
      drinksTitle: { en: "All You Can Drink", de: "All You Can Drink" },
      drinksText: {
        en: "Pay once — refill as much as you want. Mix it your way with lots of flavours, ice-cold & fresh from the Swiss Grapos system. No wait, just pour & go.",
        de: "Einmal zahlen — refill as much as you want. Mix it your way mit vielen Flavours, eiskalt & frisch aus dem Schweizer Grapos-System. No wait — einfach zapfen & go.",
      },
    },
  },
  menu: {
    tagline: { en: "What We Serve", de: "Unser Angebot" },
    title: { en: "The Menu", de: "Das Menü" },
    boxInfo: {
      en: "Menü = Burger + Classic Fries incl. Sauce + Soft Drink",
      de: "Menü = Burger + Klassische Pommes inkl. Sosse + Softdrink",
    },
    categories: {
      menus: { en: "Menüs", de: "Menüs" },
      burgers: { en: "Smashburger", de: "Smashburger" },
      sides: { en: "Sides", de: "Beilagen" },
      extras: { en: "Extras", de: "Extras" },
      sauces: { en: "Dips & Sauces", de: "Dips & Sossen" },
      drinks: { en: "Drinks", de: "Getränke" },
      sweets: { en: "Sweets", de: "Sweets" },
    },
    popular: { en: "Popular", de: "Beliebt" },
    spicy: { en: "Hot", de: "Scharf" },
  },
  location: {
    tagline: { en: "Find Us", de: "Standort" },
    title1: { en: "Come", de: "Komm" },
    title2: { en: "Grab One.", de: "Hol Dir Einen." },
    address: { en: "Address", de: "Adresse" },
    country: { en: "Switzerland", de: "Schweiz" },
    hours: { en: "Opening Hours", de: "Öffnungszeiten" },
    openDaily: {
      en: "Open daily — 11:00 to 20:00",
      de: "Täglich geöffnet — 11:00 bis 20:00 Uhr",
    },
    daily: { en: "Daily", de: "Täglich" },
    contact: { en: "Contact", de: "Kontakt" },
  },
  footer: {
    rights: { en: "All rights reserved.", de: "Alle Rechte vorbehalten." },
    imprint: { en: "Imprint", de: "Impressum" },
    privacy: { en: "Privacy", de: "Datenschutz" },
  },
  reviews: {
    tagline: { en: "Google Reviews", de: "Google Rezensionen" },
    title: { en: "What Guests Say", de: "Das Sagen Gäste" },
    onGoogle: { en: "reviews on Google", de: "Rezensionen auf Google" },
    cta: { en: "Read all reviews", de: "Alle Rezensionen lesen" },
  },
  social: {
    tagline: {
      en: "@flatties.ch on Social Media",
      de: "@flatties.ch auf Social Media",
    },
    title: { en: "Fresh from the Feed", de: "Frisch aus dem Feed" },
    cta: { en: "Follow on TikTok", de: "Auf TikTok folgen" },
    ctaInstagram: { en: "Follow on Instagram", de: "Auf Instagram folgen" },
  },
  contact: {
    navLabel: { en: "Contact", de: "Kontakt" },
    tagline: { en: "Get in Touch", de: "Sag Hallo" },
    title1: { en: "Work", de: "Mach Was" },
    title2: { en: "With Us.", de: "Mit Uns." },
    intro: {
      en: "Cooperation, franchise, influencer or UGC inquiries — drop us a line and we'll get back to you as fast as possible.",
      de: "Kooperations-, Franchise-, Influencer- oder UGC-Anfragen — schreib uns und wir melden uns so schnell wie möglich.",
    },
    name: { en: "Name", de: "Name" },
    email: { en: "Email", de: "E-Mail" },
    type: { en: "What's it about?", de: "Worum geht's?" },
    typeKoop: { en: "Cooperation / Franchise", de: "Kooperation / Franchise" },
    typeInfluencer: { en: "Influencer / UGC", de: "Influencer / UGC" },
    typeOther: { en: "Other", de: "Sonstiges" },
    message: { en: "Your message", de: "Deine Nachricht" },
    submit: { en: "Send Inquiry", de: "Anfrage Senden" },
    sending: { en: "Sending…", de: "Wird gesendet…" },
    error: {
      en: "Something went wrong — please try again.",
      de: "Etwas ist schiefgelaufen — bitte versuch es nochmal.",
    },
    thanksTag: { en: "Inquiry sent", de: "Anfrage gesendet" },
    thanksTitle: { en: "Thanks!", de: "Danke!" },
    thanksText: {
      en: "We received your inquiry and will get back to you as fast as possible.",
      de: "Wir haben deine Anfrage erhalten und antworten so schnell wie möglich.",
    },
    backHome: { en: "Back to Home", de: "Zurück zur Startseite" },
  },
} as const;

export function t(
  obj: { en: string; de: string },
  locale: Locale
): string {
  return obj[locale];
}
