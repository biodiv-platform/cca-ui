import { Avatar, Box, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import LoginIcon from "@icons/login";
import { FORWARD_BLACKLIST } from "@static/constants";
import { encode } from "base64-url";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import LocalLink from "../local-link";
import Tooltip from "../tooltip";

export default function NavbarAuthOption() {
  const { user, isLoggedIn, isPreviewMode } = useGlobalState();
  const { t } = useTranslation();
  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    setParams(
      FORWARD_BLACKLIST.find((u) => router.asPath.includes(u))
        ? {}
        : { forward: encode(router.asPath) }
    );
  }, [router.asPath]);

  return (
    <Box ml={4} hidden={isPreviewMode}>
      {isLoggedIn ? (
        <Menu>
          <MenuButton as={Link} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="sm" name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <LocalLink href={`/user/show/${user.id}`} params={params} prefixGroup={true}>
                <Link>{user.name}</Link>
              </LocalLink>
            </MenuItem>
            <MenuItem>
              <LocalLink href="/logout" params={params} prefixGroup={true}>
                <Link>{t("auth:sign_out")}</Link>
              </LocalLink>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <LocalLink href="/login" params={params} prefixGroup={true} >
          <Link lineHeight={1}>
            <Tooltip title={t("header:login_register")}>
              <LoginIcon fontSize="2xl" aria-label="Login or Register"/>
            </Tooltip>
          </Link>
        </LocalLink>
      )}
    </Box>
  );
}
