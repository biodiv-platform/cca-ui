import { Box, Flex, Heading, IconButton, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import HTMLContainer from "@components/@core/html-container";
import SITE_CONFIG from "@configs/site-config";
import { axGetAllTemplates } from "@services/cca.service";
import { axGetPageByID } from "@services/pages.service";
import { preProcessContent } from "@utils/pages.util";
import isMobile from "is-mobile";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import ParticipateCard from "./participate-card";
import EditIcon from "@/icons/edit";
import { useLocalRouter } from "@/components/@core/local-link";
import { Role } from "@/interfaces/custom";
import { hasAccess } from "@/utils/auth";

export default function TemplateParticipateListPageComponent() {
  const [templates, setTemplates] = useState<any>();
  const [info, setInfo] = useState<any>("");
  const { t, lang } = useTranslation();

  const router = useLocalRouter();
  const isAdmin = hasAccess([Role.Admin]);

  useEffect(() => {
    const platform = isMobile() ? "MOBILE" : "DESKTOP";
    axGetAllTemplates(null, { platform, language: lang }).then(({ data }) =>
      setTemplates(data.map((d) => ({ ...d, templateId: d.shortName })))
    );
    axGetPageByID(SITE_CONFIG.PAGES.PARTICIPATE_ID[lang], "full").then((r) =>
      setInfo(r.data.content)
    );
  }, [lang]);

  const handleOnEdit = () =>
    router.push(`/page/edit/${SITE_CONFIG.PAGES.PARTICIPATE_ID[lang]}`, true);

  return (
    <Container>
      <NextSeo title={t("template:participate")} />
      <Flex align="center" gap={2} my={10}>
        <Heading size="4xl">📝 {t("template:participate")}</Heading>

        {isAdmin && (
          <IconButton
            title={t("common:edit")}
            onClick={handleOnEdit}
            colorPalette="teal"
            variant="plain"
            aria-label={t("common:edit")}
            size="xl"
          >
            <EditIcon />
          </IconButton>
        )}
      </Flex>

      <Box
        as={HTMLContainer}
        mb={10}
        dangerouslySetInnerHTML={{ __html: preProcessContent(info) }}
      />

      {templates ? (
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4 }} gap="40px" mb={16}>
          {templates.map((t) => (
            <ParticipateCard template={t} key={t.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Spinner />
      )}
    </Container>
  );
}
