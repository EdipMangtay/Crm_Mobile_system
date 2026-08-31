import type { Metadata } from "next";
import "./globals.css";
import { TravelToaster } from "@/components/ui/travel";

const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(crmUrl),
  title: "TravelOS CRM",
  description: "TravelOS customer operations console",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy-900 text-cream">
        {children}
        <TravelToaster />
      </body>
    </html>
  );
}
