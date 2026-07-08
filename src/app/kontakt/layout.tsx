import type { Metadata } from "next";
import { Anton, Titan_One } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bubble",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kontakt — Flatties | St. Gallen",
  description:
    "Kooperations-, Franchise-, Influencer- oder UGC-Anfragen an Flatties in St. Gallen.",
};

export default function KontaktLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${anton.variable} ${titanOne.variable}`}>{children}</div>
  );
}
