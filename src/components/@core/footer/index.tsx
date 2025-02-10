import {
  Box,
  chakra,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden
} from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import GithubIcon from "@icons/github";
import InstagramIcon from "@icons/instagram";
import MailIcon from "@icons/mail";
import YouTubeIcon from "@icons/youtube";
import { containerMaxW } from "@static/navmenu";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ExternalBlueLink from "../blue-link/external";
import LocalLink from "../local-link";

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg="blackAlpha.100"
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    // href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{ bg: "blackAlpha.200" }}
    // target="_blank"
    rel="noreferrer noopener"
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function Footer() {
  const { t } = useTranslation();
  const { pages } = useGlobalState();

  return (
    <Box bg="gray.100" color="gray.700" className="no-print">
      <Container as={Stack} maxW={containerMaxW} py={20}>
        <SimpleGrid templateColumns={{ md: "4fr 2fr" }} gap={8}>
          <Stack gap={4}>
            <Box>
              <Image alt={t("common:site.title")} src="/next-assets/logo.png" />
            </Box>
            <Text fontSize="sm">
              <ExternalBlueLink
                color="gray.600"
                href="https://creativecommons.org/licenses/by/4.0/"
              >
                {t("common:license")}
              </ExternalBlueLink>
            </Text>
            <Stack direction="row" gap={6}>
              <SocialButton label="Mail" href={SITE_CONFIG.FOOTER.MAIL} children={<MailIcon />} />
              <SocialButton
                label="YouTube"
                href={SITE_CONFIG.FOOTER.YOUTUBE}
                children={<YouTubeIcon />}
              />
              <SocialButton
                label="Instagram"
                href={SITE_CONFIG.FOOTER.INSTAGRAM}
                children={<InstagramIcon />}
              />
              <SocialButton
                label="GitHub"
                href={SITE_CONFIG.FOOTER.GITHUB}
                children={<GithubIcon />}
              />
            </Stack>
          </Stack>
          <div>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {pages
                .flatMap((page) => [page, ...page.children])
                .filter((page) => page.showInFooter !== false)
                .map((page) => (
                  <LocalLink href={`/page/show/${page.id}`} key={page.id} prefixGroup={true}>
                    <Link>{page.title}</Link>
                  </LocalLink>
                ))}
            </SimpleGrid>
          </div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
