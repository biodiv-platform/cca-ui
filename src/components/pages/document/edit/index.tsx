import { Box } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { useLocalRouter } from "@components/@core/local-link";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import { axUpdateDocument } from "@services/document.service";
import { dateToUTC, formatDate } from "@utils/date";
import { getBibFieldsMeta } from "@utils/document";
import notification, { NotificationType } from "@utils/notification";
import { getInjectableHTML } from "@utils/text";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import BasicInfo from "../create/basic-info";
import Metadata from "../create/metadata";
import DocumentUploader from "../create/uploader";

export default function DocumentEditPageComponent({
  initialDocument,
  defaultBibFields,
  documentTypes,
  licensesList
}) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const [bibField, setBibField] = useState(getBibFieldsMeta(defaultBibFields));

  const ufileData = initialDocument.ufileData;

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        itemTypeId: Yup.number().required(),
        bibFieldData: Yup.object().shape(bibField.schema),

        contribution: Yup.string().nullable(),
        licenseId: Yup.number().required(),
        fromDate: Yup.mixed(),

        ufileData: Yup.lazy((value) =>
          value
            ? Yup.object()
                .shape({
                  id: Yup.string().nullable(),
                  resourceURL: Yup.string().required(),
                  size: Yup.number().required()
                })
                .required()
            : Yup.mixed().notRequired()
        )
      })
    ),
    defaultValues: {
      itemTypeId: initialDocument.itemTypeId,
      bibFieldData: initialDocument.bibFieldData,

      contribution: initialDocument.contribution,
      licenseId: initialDocument?.licenseId?.toString(),
      fromDate: initialDocument?.fromDate
        ? dateToUTC(formatDate(initialDocument?.fromDate)).format()
        : null,

      ufileData: ufileData
        ? {
            id: ufileData.id,
            resourceURL: ufileData.path,
            size: Number(ufileData.size)
          }
        : null,

      externalUrl: initialDocument.externalUrl,
      documentSocialPreview: initialDocument.documentSocialPreview
    }
  });

  const handleOnSubmit = async (values) => {
    const payload = {
      ...values,
      documentId: initialDocument.documentId,
      attribution: initialDocument.attribution,
      contribution: initialDocument?.contribution || "",
      rating: initialDocument.rating,
      fromDate: values.fromDate ? values.fromDate : null,

      bibFieldData: {
        ...initialDocument.bibFieldData,
        ...values.bibFieldData,
        abstract: getInjectableHTML(values.bibFieldData.abstract)
      },

      ufileData: values.ufileData
        ? {
            id: values.ufileData.id,
            mimeType: "application/pdf",
            path: values.ufileData.resourceURL,
            size: values.ufileData.size
          }
        : null
    };

    const { success } = await axUpdateDocument(payload);
    if (success) {
      notification(t("document:edit.success"), NotificationType.Success);
      router.push(`/document/show/${initialDocument.documentId}`, true);
    } else {
      notification(t("document:edit.error"));
    }
  };

  return (
    <Box className="container mt" pb={6}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <PageHeading>📄 {t("document:edit.title")}</PageHeading>
          <DocumentUploader name={initialDocument.externalUrl ? "externalUrl" : "ufileData"} />
          <BasicInfo
            documentTypes={documentTypes}
            setBibField={setBibField}
            licensesList={licensesList}
            showTags={false}
          />
          <Metadata bibFields={bibField.fields} />
          <SubmitButton leftIcon={<CheckIcon />}>{t("common:save")}</SubmitButton>
        </form>
      </FormProvider>
    </Box>
  );
}
