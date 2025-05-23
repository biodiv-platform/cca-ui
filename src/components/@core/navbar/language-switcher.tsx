import { Button } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import TranslateIcon from "@icons/translate";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect } from "react";

const LOCALE_COOKIE = "NEXT_LOCALE";

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";

export default function LanguageSwitcher() {
  const { lang } = useTranslation();
  const { isPreviewMode } = useGlobalState();

  const changeLanguage = (language, force?) => {
    setCookie(null, LOCALE_COOKIE, language, {
      maxAge: 100 * 24 * 60 * 60,
      path: "/"
    });

    if (force) {
      setLanguage(language);
    }
  };

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies[LOCALE_COOKIE]) {
      changeLanguage(lang);
    }
  }, []);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          size="xl"
          variant="plain"
          hidden={isPreviewMode}
          role="button"
          // ml={4}
          aria-label="Switch Language"
        >
          <TranslateIcon />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {Object.entries(SITE_CONFIG.LANG.LIST).map(([langCode, info]: any) => (
          <MenuItem value={langCode} key={langCode} onClick={() => changeLanguage(langCode, true)}>
            <span>{info.NAME}</span>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}
