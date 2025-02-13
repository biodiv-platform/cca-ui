import { Button, useDisclosure } from "@chakra-ui/react";
import { ResponsiveContainer } from "@components/@core/basic-table";
import PageHeading from "@components/@core/page-heading";
import { simplifyDTPayload } from "@utils/field";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import { LuDownload } from "react-icons/lu";

import Tooltip from "@/components/@core/tooltip";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot
} from "@/components/ui/dialog";

import DownloadForm from "./download-form";
import ExpandedComponent from "./expanded";
import useTemplateResponse from "./use-template-response";

export default function ResponseList() {
  const { t } = useTranslation();
  const router = useRouter();
  const { shortName, responses, fields } = useTemplateResponse();
  const { columns, data } = useMemo(() => simplifyDTPayload(fields, responses.l), [responses]);
  const { open, onOpen, onClose } = useDisclosure();

  const handleOnRowClicked = ({ id }) => router.push(`/data/show/${id}`);

  return (
    <>
      <PageHeading title={`${t("template:responses")} ${shortName}`} icon="🗃">
        <>
          <Tooltip showArrow content="Downlaod CCA Data">
            <Button colorScheme="blue" variant="ghost" onClick={onOpen}>
              <LuDownload />
              {t("common:download")}
            </Button>
          </Tooltip>
          <DialogRoot open={open} onOpenChange={onClose}>
            <DialogBackdrop />
            <DialogContent>
              <DialogHeader pb={"auto"}>
                {t("template:request_cca_contibutor.add_request")}
              </DialogHeader>
              <DialogCloseTrigger />
              <DialogBody>
                <DownloadForm onClose={onClose} shortName={shortName} />
              </DialogBody>
            </DialogContent>
          </DialogRoot>
        </>
      </PageHeading>
      <ResponsiveContainer>
        <DataTable
          columns={columns}
          data={data}
          onRowClicked={handleOnRowClicked}
          pagination={true}
          highlightOnHover
          expandableRows={true}
          expandableRowsComponent={ExpandedComponent}
        />
      </ResponsiveContainer>
    </>
  );
}
