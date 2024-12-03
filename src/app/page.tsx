import WelcomePage from "./pages/welcome-page/page";
import { AppProps } from "next/app";

export default function Home() {
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

