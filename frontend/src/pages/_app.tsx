import "@/styles/global_test.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
