import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://flatties.ch",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://flatties.ch/kontakt",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
