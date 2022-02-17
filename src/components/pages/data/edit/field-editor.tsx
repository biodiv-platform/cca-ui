import { Button, HStack } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import ParticipateTemplateFieldRenderer from "@components/pages/participate/template/participate-template-field-renderer";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateParticipation } from "@services/cca.service";
import { reverseFlatSaveData, toFlatSaveData } from "@utils/field";
import notification, { NotificationType } from "@utils/notification";
import { generateValidationStatement } from "@utils/validation";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import useTemplateResponseEdit from "./use-template-response-edit";

export default function FieldEditor({ field, onClose }) {
  const { response, setResponse, template } = useTemplateResponseEdit();
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape(Object.fromEntries([generateValidationStatement(field)]))
    ),
    defaultValues: reverseFlatSaveData(field, response?.ccaFieldValues?.[field.fieldId]?.value)
  });

  const handleOnSubmit = async (values) => {
    const paylod = {
      id: response.id,
      shortName: template.shortName,
      ccaFieldValues: toFlatSaveData([field], values)
    };

    const { success, data } = await axUpdateParticipation(paylod);
    if (success) {
      notification(t("form:saved.success"), NotificationType.Success);
      setResponse(data);
      onClose();
    } else {
      notification(t("form:saved.error"));
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ParticipateTemplateFieldRenderer field={field} />
        <HStack my={2}>
          <SubmitButton>{t("common:save")}</SubmitButton>
          <Button onClick={onClose}>{t("common:cancel")}</Button>
        </HStack>
      </form>
    </FormProvider>
  );
}
