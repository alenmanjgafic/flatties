import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Interne Statistik-Seite und API nicht in Suchmaschinen
      disallow: ["/stats", "/api/"],
    },
    sitemap: "https://flatties.ch/sitemap.xml",
  };
}
