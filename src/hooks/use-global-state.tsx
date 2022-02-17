import { axGetTree } from "@services/pages.service";
import { AUTHWALL } from "@static/events";
import { getParsedUser, removeCookies } from "@utils/auth";
import { getLanguageId } from "@utils/i18n";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useListener } from "react-gbus";

interface GlobalStateContextProps {
  user?;
  setUser;

  pages;
  setPages;
  fetchPages;

  isPreviewMode;
  isLoggedIn: boolean;
  logOut;

  languageId?;
}

interface GlobalStateProviderProps {
  initialState;
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = ({ initialState, children }: GlobalStateProviderProps) => {
  const [user, setUser] = useState<any>(initialState.user || {});
  const [pages, setPages] = useState<any[]>([]);
  const router = useRouter();
  const { lang, t } = useTranslation();

  const languageId = useMemo(() => getLanguageId(lang)?.ID, [lang]);
  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const isPreviewMode = useMemo(() => router?.query?.preview !== undefined, [router.query]);

  useListener(() => {
    setUser(getParsedUser());
  }, [AUTHWALL.SUCCESS]);

  const fetchPages = async () => {
    const newPages = await axGetTree({ languageId });
    setPages(newPages.data);
  };

  useEffect(() => {
    fetchPages();
  }, [languageId]);

  const logOut = () => {
    try {
      removeCookies();
      setUser({});
    } catch (e) {
      console.error(e);
    }
    router.push("/");
  };

  return (
    <GlobalStateContext.Provider
      value={{
        ...initialState,
        user,
        setUser,

        languageId,

        pages,
        setPages,
        fetchPages,

        isPreviewMode,
        isLoggedIn,
        logOut
      }}
    >
      <DefaultSeo
        titleTemplate={`%s - ${t("common:site.title")}`}
        defaultTitle={t("common:site.title")}
        openGraph={{
          type: "website",
          locale: lang,
          site_name: t("common:site.title")
        }}
      />
      {children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
