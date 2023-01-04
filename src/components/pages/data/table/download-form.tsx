import { Box, Container } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import { SubmitButton } from "@components/form/submit-button";
import { TextAreaField } from "@components/form/textarea";
import { axDownloadRequest } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function DownloadForm({ onClose, shortName }) {
  const { t } = useTranslation();
  const hForm = useForm<any>({
    mode: "onChange"
  });

  const sendDownloadRequest = async (value) => {
    const payload = {
      shortName: shortName,
      projectAll: true,

      ...value,
    };

    const { success } = await axDownloadRequest(payload);
    if (success) {
      notification(
        <>
          {t("Sucess")}{" "}
          <ExternalBlueLink href="/user/download-logs">
            {t("Download logs")}
          </ExternalBlueLink>
        </>,
        NotificationType.Success
      );
    } else {
      notification(t("template:download_cca_template.error"));
    }
    onClose(false);
  };

  return (
    <>
      <Container textAlign="center">
        <Box display="flex" alignItems="center">
          <FormProvider {...hForm}>
            <form onSubmit={hForm.handleSubmit(sendDownloadRequest)}>
              <TextAreaField
                name="notes"
                isRequired={true}
                label={t("template:download_cca_template.label")}
                placeholder={t("template:download_cca_template.placeholder")}
                maxLength="200"
              />
              <SubmitButton>{t("form:submit")}</SubmitButton>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </>
  );
}