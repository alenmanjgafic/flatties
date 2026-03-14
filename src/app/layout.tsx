import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flatties — Premium Smashed Burgers | St. Gallen",
  description:
    "Flatties is a premium street food brand in St. Gallen. Bold flavours, fast service and the best smashed burgers in town.",
  keywords: ["Flatties", "Burger", "St. Gallen", "Smashed Burger", "Street Food", "Restaurant"],
  openGraph: {
    title: "Flatties — Premium Smashed Burgers",
    description: "Bold flavours. Fast service. St. Gallen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
