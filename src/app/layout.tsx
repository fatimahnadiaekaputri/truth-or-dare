import type { Metadata } from "next";
import "./globals.css";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";
import { PlayerProvider } from "@/components/player/PlayerContext";

export const metadata: Metadata = {
  title: "Truth or Dare",
  description: "Dare to Reveal the Truth!",
  icons: {
    icon: "/favicon.ico", // Atur favicon di sini
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <PlayerProvider>
          <HeaderTop />
          <main>{children}</main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
