import { DownloadIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { ResponsiveContainer } from "@components/@core/basic-table";
import PageHeading from "@components/@core/page-heading";
import { simplifyDTPayload } from "@utils/field";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

import DownloadForm from "./download-form";
import ExpandedComponent from "./expanded";
import useTemplateResponse from "./use-template-response";

export default function ResponseList() {
  const { t } = useTranslation();
  const router = useRouter();
  const { shortName, responses, fields } = useTemplateResponse();
  const { columns, data } = useMemo(() => simplifyDTPayload(fields, responses.l), [responses]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnRowClicked = ({ id }) => router.push(`/data/show/${id}`);

  return (
    <>
      <PageHeading title={`${t("template:responses")} ${shortName}`} icon="🗃">
        <>
          <Tooltip hasArrow label="Downlaod CCA Data">
            <Button leftIcon={<DownloadIcon />} colorScheme="blue" variant="ghost" onClick={onOpen}>
              {t("common:download")}
            </Button>
          </Tooltip>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{t("template:request_cca_contibutor.add_request")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DownloadForm onClose={onClose} shortName={shortName} />
              </ModalBody>
            </ModalContent>
          </Modal>
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
