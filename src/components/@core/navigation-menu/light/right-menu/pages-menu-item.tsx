import { Separator } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { getPagesMenu } from "@utils/pages";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import { MenuContent, MenuItem   } from "@/components/ui/menu";

const SubMenuLink = ({ item, onClose }) => (
  <>
    <LocalLink href={item.to} params={item.params} prefixGroup={true}>
      <MenuItem
        value={item.to}
        as="a"
        w="full"
        onClick={onClose}
        fontWeight={item?.rows ? "bold" : "normal"}
      >
        {item.name}
      </MenuItem>
    </LocalLink>
    {item?.rows && item.rows.map((i) => <SubMenuLink item={i} onClose={onClose} key={i.name} />)}
    {item?.rows && <Separator />}
  </>
);

export default function PagesMenuItem({ onClose }) {
  const { pages } = useGlobalState();
  const { t } = useTranslation();
  const pagesMenu = useMemo(() => getPagesMenu(pages), [pages]);

  return (
    <MenuContent maxH="18.5rem" overflow="auto">
      {pages.length ? (
        pagesMenu.map((item) => <SubMenuLink item={item} onClose={onClose} key={item.name} />)
      ) : (
        <LocalLink prefixGroup={true} href="/page/empty">
          <MenuItem value="page" as="a" w="full" onClick={onClose}>
            {t("header:menu_secondary.pages.empty")}
          </MenuItem>
        </LocalLink>
      )}
    </MenuContent>
  );
}
