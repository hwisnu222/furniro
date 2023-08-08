import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

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
  return (
    <SessionProvider session={session}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    </SessionProvider>
  );
}
