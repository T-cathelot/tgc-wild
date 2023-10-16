import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        containerStyle={{ marginTop: "10%", marginLeft: "10%" }}
        toastOptions={{
          success: {
            style: { background: "#9b9b9baf", color: "white" },
          },
          error: {
            style: {
              background: "#9b9b9baf",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
