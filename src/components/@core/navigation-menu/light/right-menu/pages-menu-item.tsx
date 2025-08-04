import { Link, Menu, Separator } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { getPagesMenu } from "@utils/pages";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

const SubMenuLink = ({ item, onClose }) => (
  <>
    <Menu.Item
      asChild
      value={item.to}
      w="full"
      onClick={onClose}
      fontWeight={item?.rows ? "bold" : "normal"}
    >
      <LocalLink href={item.to} params={item.params} prefixGroup={true}>
        {item.name}
      </LocalLink>
    </Menu.Item>

    {item?.rows && item.rows.map((i) => <SubMenuLink item={i} onClose={onClose} key={i.name} />)}
    {item?.rows && <Separator />}
  </>
);

export default function PagesMenuItem({ onClose }) {
  const { pages } = useGlobalState();
  const { t } = useTranslation();
  const pagesMenu = useMemo(() => getPagesMenu(pages), [pages]);

  return (
    <Menu.Content maxH="18.5rem" overflow="auto">
      {pages.length ? (
        pagesMenu.map((item) => <SubMenuLink item={item} onClose={onClose} key={item.name} />)
      ) : (
        <LocalLink prefixGroup={true} href="/page/empty">
          <Menu.Item value="page" w="full" onClick={onClose}>
            {t("header:menu_secondary.pages.empty")}
          </Menu.Item>
        </LocalLink>
      )}
    </Menu.Content>
  );
}
