import { Link } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import { FORWARD_BLACKLIST } from "@static/constants";
import { encode } from "base64-url";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

export default function LoginButton() {
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
    <NextLink href="/login" params={params} prefixGroup={true}>
      <Link>{t("header:sign_in")}</Link>
    </NextLink>
  );
}
