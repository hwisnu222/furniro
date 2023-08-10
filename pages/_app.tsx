import "@/styles/globals.css";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextSeo } from "next-seo";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";

// them pmaterial ui
const theme = createTheme({
  palette: {
    primary: {
      main: "#B88E2F",
    },
    secondary: {
      main: "#FFF3E3",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ApolloProvider client={client}>
          <SessionProvider session={session}>
            <NextSeo
              title={Component?.meta?.title}
              description={Component?.meta?.description}
            />
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionProvider>
        </ApolloProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
