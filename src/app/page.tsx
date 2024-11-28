import { PlayerProvider } from "@/components/player/PlayerContext";
import WelcomePage from "./pages/welcome-page/page";
import { AppProps } from "next/app";

export default function Home({ Component, pageProps}: AppProps) {
  return (
    // <RootLayout>
    <>
        <WelcomePage></WelcomePage>
        {/* <PlayerProvider>
            <Component {...pageProps} />
        </PlayerProvider> */}
    </>
    // </RootLayout>
    );
}

