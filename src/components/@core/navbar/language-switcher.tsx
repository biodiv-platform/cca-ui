import { Button, Menu, Portal } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import TranslateIcon from "@icons/translate";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect } from "react";

const LOCALE_COOKIE = "NEXT_LOCALE";

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
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          size="xl"
          variant="plain"
          hidden={isPreviewMode}
          role="button"
          aria-label="Switch Language"
        >
          <TranslateIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {Object.entries(SITE_CONFIG.LANG.LIST).map(([langCode, info]: any) => (
              <Menu.Item
                value={langCode}
                key={langCode}
                onClick={() => changeLanguage(langCode, true)}
              >
                <span>{info.NAME}</span>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
