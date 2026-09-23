import { IconButton } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <IconButton
      className="no-print"
      aria-label={t("common:scroll_to_top")}
      onClick={() => window.scrollTo({ top: 0 })}
      position="fixed"
      bottom={8}
      right={8}
      rounded="full"
      size="lg"
      colorPalette="blue"
      shadow="lg"
      zIndex={30}
    >
      <LuArrowUp />
    </IconButton>
  );
}
