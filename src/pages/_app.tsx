import { ChakraProvider } from "@chakra-ui/react";
import type { AppContext, AppProps } from "next/app";
import React from "react";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { getAllProducts } from "../services/products.service";
import "../styles/globals.css";

type PageLayout = {
  Component?: { Layout?: React.FC<{ children?: React.ReactNode }> };
};

function MyApp({ Component, pageProps }: AppProps & PageLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("products", getAllProducts);

    return {
      pageProps: { dehydratedState: dehydrate(queryClient) },
    };
  } catch (error: any) {
    return {};
  }
};

export default MyApp;
