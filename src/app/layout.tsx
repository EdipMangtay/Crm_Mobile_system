import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travia Dubai | VIP Dubai Turları & Vize Danışmanlığı",
  description:
    "Dubai'yi size özel yaşayın. Kişiye özel VIP turlar, profesyonel vize danışmanlığı, çöl safarisi, yat turları ve daha fazlası. 10 saatlik özel lüks araç ve Türkçe rehber eşliğinde unutulmaz bir Dubai deneyimi.",
  keywords: [
    "Dubai tur",
    "Dubai vize",
    "VIP tur Dubai",
    "Dubai vize danışmanlığı",
    "Dubai özel tur",
    "Dubai şehir turu",
    "Travia Dubai",
    "Dubai lüks tur",
    "Dubai çöl safarisi",
    "Dubai yat turu",
  ],
  openGraph: {
    title: "Travia Dubai | VIP Dubai Turları & Vize Danışmanlığı",
    description:
      "Dubai'yi size özel yaşayın. Kişiye özel VIP turlar, profesyonel vize danışmanlığı ve unutulmaz deneyimler.",
    url: "https://traviadubai.com",
    siteName: "Travia Dubai",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy-900 text-cream">
        {children}
      </body>
    </html>
  );
}
