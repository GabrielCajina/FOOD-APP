import { ChakraProvider } from "@chakra-ui/react";
import useMyQueryClient from "client/useMyQueryClient";
import type { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import "../styles/globals.css";

type PageLayout = {
  Component?: { Layout?: React.FC<{ children?: React.ReactNode }> };
};

function MyApp({ Component, pageProps }: AppProps & PageLayout) {
  const queryClient = useMyQueryClient();
  const Layout = Component.Layout ?? React.Fragment;

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
