import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

type PageLayout = {
  Component?: { Layout?: React.FC<{ children?: React.ReactNode }> };
};

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps & PageLayout) {
  const Layout = Component.Layout ?? React.Fragment;

  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
