import { Box, Container } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { TextAreaField } from "@components/form/textarea";
import { axsendContributorRequest } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewRequestForm({ onClose, defaultValues }) {
  const { t } = useTranslation();
  const hForm = useForm<any>({
    mode: "onChange"
  });

  const sendContributorRequest = async (value) => {
    const payload = {
      ...value,
      ...defaultValues
    };

    const { success } = await axsendContributorRequest(payload);
    if (success) {
      notification(t("template:request_cca_contibutor.success"), NotificationType.Success);
    } else {
      notification(t("template:request_cca_contibutor.error"));
    }
    onClose(false);
  };

  return (
    <>
      <Container textAlign="center">
        <Box display="flex" alignItems="center">
          <FormProvider {...hForm}>
            <form onSubmit={hForm.handleSubmit(sendContributorRequest)}>
              <TextAreaField
                name="requestorMessage"
                isRequired={true}
                label={t("template:request_cca_contibutor.label")}
                placeholder={t("template:request_cca_contibutor.placeholder")}
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
