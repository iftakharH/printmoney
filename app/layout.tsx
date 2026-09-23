import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BadgeUnlockToast } from "@/components/gamification/BadgeUnlockToast";
import { StoreHydration } from "@/components/layout/StoreHydration";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — How money is printed, created & kept`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "money printing",
    "banknote design",
    "inflation calculator",
    "financial literacy",
    "money creation",
    "quantitative easing",
    "investment basics",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <StoreHydration />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BadgeUnlockToast />
      </body>
    </html>
  );
}
