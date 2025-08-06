import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

const lilitaOne = Lilita_One({
  variable: "--font-lilita-one",
  subsets: ["latin"],
  weight: ["400"],
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Math Castle - Game Matematika Multiplayer Indonesia",
  description:
    "Jawab soal matematika, rebut petak, dan bangun kastilmu! Tantang pemain lain dalam pertempuran 10 menit yang seru dan penuh strategi! Game edukasi matematika terbaik Indonesia.",
  keywords:
    "math castle, game matematika, multiplayer, edukasi, indonesia, belajar matematika, game online",
  authors: [{ name: "Math Castle Team" }],
  creator: "Math Castle",
  publisher: "Math Castle",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mathcastle.vercel.app",
    title: "Math Castle - Game Matematika Multiplayer",
    description:
      "Game matematika multiplayer terbaik Indonesia! Jawab soal, rebut petak, bangun kastil!",
    siteName: "Math Castle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Castle - Game Matematika Multiplayer",
    description: "Game matematika multiplayer terbaik Indonesia!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>

      <body
        className={`${lilitaOne.className} antialiased h-[100dvh] overflow-hidden !bg-bottom/85`}
        style={{ touchAction: "none" }} // Prevent double-tap zoom
      >
        {children}
      </body>
    </html>
  );
}
