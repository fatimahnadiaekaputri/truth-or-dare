import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";
import { PlayerProvider } from "@/components/player/PlayerContext";



// const inter = Inter({ subsets: ["latin"] });
const logoUrl = "/favicon.ico";

export const metadata: Metadata = {
  title: "Truth or Dare",
  description: "Dare to Reveal the Truth!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel ="icon" href={logoUrl}/>
      </Head>
      <body className="bg-background">
        <PlayerProvider> 
          <div id="root"></div>
            <HeaderTop />
              {children}
            <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
