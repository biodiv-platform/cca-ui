import { Button } from "@chakra-ui/react";
import { BasicTable, ResponsiveContainer } from "@components/@core/basic-table";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import PageHeading from "@components/@core/page-heading";
import AddIcon from "@icons/add";
import { axGetAllTemplates } from "@services/cca.service";
import { TEMPLATE } from "@static/events";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";

import { ListColumns } from "./columns";

export default function TemplateListComponent() {
  const { t, lang } = useTranslation();
  const [templateList, setTemplateList] = useState<any[]>([]);

  useListener(
    ({ templateId }) => setTemplateList(templateList.filter((t) => t.shortName !== templateId)),
    [TEMPLATE.DELETED]
  );

  useEffect(() => {
    axGetAllTemplates(null, { language: lang }).then(({ data }) =>
      setTemplateList(
        data.map((t) => ({
          ...t,
          deleteId: t.shortName,
          editId: t.shortName,
          responseShowId: t.shortName
        }))
      )
    );
  }, [lang]);

  return (
    <Container>
      <NextSeo title={t("template:templates")} />
      <PageHeading title={t("template:templates")} icon="🗃">
        <LocalLink href="/template/create" prefixGroup={true}>
          <Button as="a" colorPalette="green">
            <AddIcon />
            {t("common:add")}
          </Button>
        </LocalLink>
      </PageHeading>

      <ResponsiveContainer mb={16}>
        <BasicTable data={templateList} translateHeader={true} columns={ListColumns} />
      </ResponsiveContainer>
    </Container>
  );
}
