import "@/styles/global_test.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { getMe } from "@/graphql/getMe";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserType } from "@/types";

const link = createHttpLink({
  uri: "http://localhost:5000",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const publicPages = ["/", "/signup", "/ads/[id]"];

const Auth = (props: { children: React.ReactNode }) => {
  const { data, loading, error } = useQuery<{ item: UserType }>(getMe);
  const router = useRouter();
  console.log("here the data", data);

  useEffect(() => {
    if (publicPages.includes(router.pathname) === false) {
      if (error) {
        router.replace("/signin");
      }
    }
  }, [router.pathname, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return props.children;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Auth>
          <ToastContainer />
          <Component {...pageProps} />
        </Auth>
      </ApolloProvider>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
