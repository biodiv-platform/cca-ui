import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import HTMLContainer from "@components/@core/html-container";
import PageHeading from "@components/@core/page-heading";
import SITE_CONFIG from "@configs/site-config";
import { axGetAllTemplates } from "@services/cca.service";
import { axGetPageByID } from "@services/pages.service";
import { preProcessContent } from "@utils/pages.util";
import isMobile from "is-mobile";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import ParticipateCard from "./participate-card";

export default function TemplateParticipateListPageComponent() {
  const [templates, setTemplates] = useState<any>();
  const [info, setInfo] = useState<any>("");
  const { t, lang } = useTranslation();

  useEffect(() => {
    const platform = isMobile() ? "MOBILE" : "DESKTOP";
    axGetAllTemplates(null, { platform, language: lang }).then(({ data }) =>
      setTemplates(data.map((d) => ({ ...d, templateId: d.shortName })))
    );
    axGetPageByID(SITE_CONFIG.PAGES.PARTICIPATE_ID[lang], "full").then((r) =>
      setInfo(r.data.content)
    );
  }, [lang]);

  return (
    <Container>
      <NextSeo title={t("template:participate")} />
      <PageHeading title={t("template:participate")} icon="📝" />

      <Box
        as={HTMLContainer}
        mb={10}
        dangerouslySetInnerHTML={{ __html: preProcessContent(info) }}
      />

      {templates ? (
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4 }} spacing="40px" mb={16}>
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
