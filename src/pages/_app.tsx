import "../styles/globals.scss";
import "keen-slider/keen-slider.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthWall from "@components/@core/container/authwall";
import Footer from "@components/@core/footer";
import NavBar from "@components/@core/navbar";
import NavigationMenuLight from "@components/@core/navigation-menu/light";
import SITE_CONFIG from "@configs/site-config";
import { customTheme } from "@configs/theme";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { axGroupList } from "@services/app.service";
import { getParsedUser } from "@utils/auth";
import { absoluteUrl } from "@utils/basic";
import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user, groups, currentGroup, languageId }) {
  const config = { header: true, footer: true, ...Component?.config };

  return (
    <GlobalStateProvider initialState={{ user, groups, currentGroup, languageId }}>
      <ChakraProvider theme={customTheme}>
        <NavBar />
        <div className="content">
          {config.header && (
            <>
              <NavigationMenuLight />
            </>
          )}
        </div>
        <Box minH="calc(100vh - var(--heading-height))">
          <Component {...pageProps} />
        </Box>
        {config?.footer && <Footer />}
        <AuthWall />
      </ChakraProvider>
    </GlobalStateProvider>
  );
}

MainApp.getInitialProps = async (appContext) => {
  const { pageProps } = await App.getInitialProps(appContext);

  const aReq = absoluteUrl(appContext.ctx, appContext.router.asPath);
  const domain = aReq.hostname.split(".").slice(-2).join(".");

  const user = getParsedUser(appContext.ctx);
  const languageId = SITE_CONFIG.LANG.LIST[appContext.ctx.locale]?.ID;

  const { currentGroup, groups } = await axGroupList(aReq.href, appContext.ctx.locale);

  return { pageProps, user, groups, domain, currentGroup, languageId };
};

export default MainApp;
