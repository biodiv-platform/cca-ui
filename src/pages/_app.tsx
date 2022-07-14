import "../styles/globals.scss";
import "keen-slider/keen-slider.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthWall from "@components/@core/container/authwall";
import Footer from "@components/@core/footer";
import NavBar from "@components/@core/navbar";
import { customTheme } from "@configs/theme";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { getParsedUser } from "@utils/auth";
import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user }) {
  return (
    <GlobalStateProvider initialState={{ user }}>
      <ChakraProvider theme={customTheme}>
        <NavBar />
        <Box minH="calc(100vh - var(--header-height))">
          <Component {...pageProps} />
        </Box>
        <Footer />
        <AuthWall />
      </ChakraProvider>
    </GlobalStateProvider>
  );
}

MainApp.getInitialProps = async (appContext) => {
  const { pageProps } = await App.getInitialProps(appContext);

  const user = getParsedUser(appContext.ctx);

  return { pageProps, user };
};

export default MainApp;
