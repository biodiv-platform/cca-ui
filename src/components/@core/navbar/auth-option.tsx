import { Avatar, Box, Button, Link, Menu, Portal } from "@chakra-ui/react";
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
    <Box hidden={isPreviewMode}>
      {isLoggedIn ? (
        <Menu.Root>
          <Menu.Trigger as={Link} rounded="full" cursor="pointer" minW={0}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user?.name} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="usershow" asChild>
                  <LocalLink href={`/user/show/${user.id}`} params={params} prefixGroup={true}>
                    {user.name}
                  </LocalLink>
                </Menu.Item>
                <Menu.Item value="logout" asChild>
                  <LocalLink href="/logout" params={params} prefixGroup={true}>
                    {t("auth:sign_out")}
                  </LocalLink>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <LocalLink href="/login" params={params} prefixGroup={true}>
          <Tooltip title={t("header:login_register")}>
            <Button size="xl" variant={"plain"} role="button" aria-label="Login or Register">
              <LoginIcon />
            </Button>
          </Tooltip>
        </LocalLink>
      )}
    </Box>
  );
}
