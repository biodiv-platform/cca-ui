import { UserGroupIbpExtended } from "@interfaces/custom";
import { axCheckUserGroupMember } from "@services/app.service";
import { axGetTree } from "@services/pages.service";
import { AUTHWALL } from "@static/events";
import { getParsedUser, removeCookies } from "@utils/auth";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useListener } from "react-gbus";
import { useDeepCompareMemo } from "use-deep-compare";

interface GlobalStateContextProps {
  user?;
  setUser;
  isLoggedIn: boolean;
  logOut;

  groups?: UserGroupIbpExtended[];

  currentGroup: UserGroupIbpExtended;
  isCurrentGroupMember?: boolean;
  setIsCurrentGroupMember;
  languageId?;

  pages;
  setPages;
  getPageTree?;
  fetchPages?;

  isPreviewMode;
}

interface GlobalStateProviderProps {
  initialState;
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = ({ initialState, children }: GlobalStateProviderProps) => {
  const [user, setUser] = useState<any>(initialState.user || {});
  const [pages, setPages] = useState<any[]>([]);
  const [isCurrentGroupMember, setIsCurrentGroupMember] = useState<boolean>();

  const router = useRouter();
  const { lang, t } = useTranslation();

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const isPreviewMode = useMemo(() => router?.query?.preview !== undefined, [router.query]);

  const fetchIsCurrentGroupMember = async () => {
    if (!isLoggedIn) return;

    const isCurrentGroupMember = await axCheckUserGroupMember(initialState.currentGroup?.id);
    setIsCurrentGroupMember(isCurrentGroupMember);
  };

  useEffect(() => {
    fetchIsCurrentGroupMember();
  }, [initialState.currentGroup, user]);

  const getPageTree = async () => {
    try {
      const { data } = await axGetTree({
        userGroupId: initialState.currentGroup?.id,
        languageId: initialState.languageId
      });
      setPages(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPageTree();
  }, [initialState.currentGroup?.id, initialState.languageId]);

  useListener(() => {
    setUser(getParsedUser());
  }, [AUTHWALL.SUCCESS]);

  const logOut = () => {
    try {
      removeCookies();
      setUser({});
    } catch (e) {
      console.error(e);
    }
    router.push("/");
  };

  const value = {};

  // to avoid unnecessary re-renders
  const valueMemo = useDeepCompareMemo(
    () => ({
      groups: initialState.groups,
      currentGroup: initialState.currentGroup,
      isCurrentGroupMember,
      setIsCurrentGroupMember,

      pages,
      setPages,
      getPageTree,

      user,
      setUser,
      isLoggedIn,
      logOut,

      languageId: initialState.languageId,

      isPreviewMode
    }),
    [value, initialState, pages, user, isLoggedIn, isCurrentGroupMember, initialState.languageId]
  );

  return (
    <GlobalStateContext.Provider value={valueMemo}>
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
