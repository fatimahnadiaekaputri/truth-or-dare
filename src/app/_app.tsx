import { PlayerProvider } from "@/components/player/PlayerContext"; // Make sure this path is correct
import { AppProps } from "next/app"; 

export default function App({ Component, pageProps }: AppProps) {
    return (
        // Wrap the entire app with PlayerProvider
        <PlayerProvider>
            <Component {...pageProps} />
        </PlayerProvider>
    );
}
