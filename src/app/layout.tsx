import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import HeaderTop from "@/components/layout/HeaderTop";
import Footer from "@/components/layout/Footer";


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
      {/* <body className={inter.className}> */}
        <div id="root"></div>
        <HeaderTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import Head from "next/head";
// import "./globals.css";
// import HeaderTop from "@/components/HeaderTop";
// import Footer from "@/components/Footer";

// const logoUrl = "/favicon.ico";

// export const metadata: Metadata = {
//   title: "Truth or Dare",
//   description: "Dare to Reveal the Truth!",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <Head>
//         <link rel="icon" href={logoUrl} />
//       </Head>
//       <body className="bg-background min-h-screen flex flex-col">
//         <HeaderTop />
//         <main className="flex-grow">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

// import type { AppProps } from "next/app";
// import Head from "next/head";
// import "./globals.css";
// import HeaderTop from "@/components/HeaderTop";
// import Footer from "@/components/Footer";

// const logoUrl = "/favicon.ico";

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <link rel="icon" href={logoUrl} />
//         <title>Truth or Dare</title>
//         <meta name="description" content="Dare to Reveal the Truth!" />
//       </Head>
//       <div className="bg-background min-h-screen flex flex-col">
//         <HeaderTop />
//         <main className="flex-grow">
//           <Component {...pageProps} />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default MyApp;

