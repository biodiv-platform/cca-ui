import { Avatar, Box, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import LoginIcon from "@icons/login";
import { FORWARD_BLACKLIST } from "@static/constants";
import { encode } from "base64-url";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import Tooltip from "../tooltip";

export default function NavbarAuthOption() {
  const { user, isLoggedIn, isPreviewMode } = useGlobalState();
  const { t } = useTranslation();
  const router = useRouter();

  const forward = useMemo(
    () =>
      FORWARD_BLACKLIST.find((u) => router.asPath.includes(u))
        ? "/login"
        : `/login?forward=${encode(router.asPath)}`,
    [router.asPath]
  );

  return (
    <Box ml={4} hidden={isPreviewMode}>
      {isLoggedIn ? (
        <Menu>
          <MenuButton as={Link} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="sm" name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NextLink href={`/user/show/${user.id}`} passHref={true}>
                <Link>{user.name}</Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/logout" passHref={true}>
                <Link>{t("auth:sign_out")}</Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <NextLink href={forward} passHref={true}>
          <Link lineHeight={1}>
            <Tooltip title={t("header:login_register")}>
              <LoginIcon fontSize="2xl" />
            </Tooltip>
          </Link>
        </NextLink>
      )}
    </Box>
  );
}
