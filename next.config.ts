import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TikTok-Video-Thumbnails (oEmbed) liegen auf wechselnden CDN-Subdomains;
    // der Host hängt von der Region des abrufenden Servers ab (eu/us/…)
    remotePatterns: [
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
    ],
  },
  async redirects() {
    // Alte Versions-URLs auf die Startseite umleiten
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v4", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
