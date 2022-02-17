import { DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ResponsiveContainer } from "@components/@core/basic-table";
import PageHeading from "@components/@core/page-heading";
import { formatDate } from "@utils/date";
import { simplifyDTPayload } from "@utils/field";
import j2x from "json-as-xlsx";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

import useTemplateResponse from "./use-template-response";

export default function ResponseList() {
  const { t } = useTranslation();
  const router = useRouter();
  const { shortName, responses, fields } = useTemplateResponse();
  const { columns, data } = useMemo(() => simplifyDTPayload(fields, responses.l), [responses]);

  const downloadXLS = () => {
    j2x([{ sheet: shortName, columns, content: data }], {
      fileName: `${shortName}-${formatDate(new Date().getTime())}`
    });
  };

  const handleOnRowClicked = ({ id }) => router.push(`/data/show/${id}`);

  return (
    <>
      <PageHeading title={`${t("template:responses")} ${shortName}`} icon="🗃">
        <Button
          colorScheme="blue"
          float="right"
          mb={4}
          onClick={downloadXLS}
          leftIcon={<DownloadIcon />}
        >
          {t("common:download")}
        </Button>
      </PageHeading>
      <ResponsiveContainer>
        <DataTable
          columns={columns}
          data={data}
          onRowClicked={handleOnRowClicked}
          pagination={true}
        />
      </ResponsiveContainer>
    </>
  );
}
