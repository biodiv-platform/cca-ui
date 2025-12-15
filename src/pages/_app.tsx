import "../styles/globals.scss";
import "keen-slider/keen-slider.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthWall from "@components/@core/container/authwall";
import Metadata from "@components/@core/container/metadata";
import Footer from "@components/@core/footer";
import NavBar from "@components/@core/navbar";
import NavigationMenuLight from "@components/@core/navigation-menu/light";
import SITE_CONFIG from "@configs/site-config";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { axGroupList } from "@services/app.service";
import { getParsedUser } from "@utils/auth";
import { absoluteUrl } from "@utils/basic";
import App from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import React from "react";

import { customTheme } from "@/configs/theme";
import { axGetActiveAnnouncement } from "@/services/utility.service";
import Announcement from "@/components/@core/announcements";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user, groups, currentGroup, languageId, announcement }) {
  const config = { header: true, footer: true, ...Component?.config };
  const router = useRouter();

  return (
    <ChakraProvider value={customTheme}>
      <GlobalStateProvider initialState={{ user, groups, currentGroup, languageId, announcement }}>
        <Metadata />
        <div className="content">
          {config.header && (
            <>
              <NavBar />
              <NavigationMenuLight />
              <Announcement />
            </>
          )}
        </div>
        <Box minH="calc(100vh - var(--heading-height))">
          <Component {...pageProps} />
        </Box>
        {config?.footer && router.pathname != "/data/list" && <Footer />}
        <AuthWall />
      </GlobalStateProvider>
    </ChakraProvider>
  );
}

MainApp.getInitialProps = async (appContext) => {
  const { pageProps } = await App.getInitialProps(appContext);

  const aReq = absoluteUrl(appContext.ctx, appContext.router.asPath);
  const domain = aReq.hostname.split(".").slice(-2).join(".");

  const user = getParsedUser(appContext.ctx);
  const languageId = SITE_CONFIG.LANG.LIST[appContext.ctx.locale]?.ID;

  const { currentGroup, groups } = await axGroupList(
    aReq.href,
    languageId ? languageId : SITE_CONFIG.LANG.DEFAULT_ID,
    appContext.ctx.locale
  );

  const { data: announcement } = await axGetActiveAnnouncement();

  return { pageProps, user, groups, domain, currentGroup, languageId, announcement };
};

export default MainApp;
