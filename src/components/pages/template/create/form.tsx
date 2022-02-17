import { SimpleGrid } from "@chakra-ui/react";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import { PLATFORM_OPTIONS } from "@components/pages/register/form/options";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@interfaces/custom";
import { axCreateTemplate } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import { translateOptions } from "@utils/translation";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export function CreateTemplateForm() {
  const { t } = useTranslation();
  const router = useRouter();

  const roles = useMemo(
    () =>
      Object.entries(Role)
        .map(([k, v]) => ({ label: k, value: v }))
        .filter((r) => ![Role.Admin, Role.Any].includes(r.value)),
    []
  );

  const hForm = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        shortName: Yup.string().required(),
        name: Yup.string().required(),
        platform: Yup.array().min(1).required(),
        permissions: Yup.array().nullable(),
        description: Yup.string().required()
      })
    )
  });

  const handleOnSubmit = async (values) => {
    const payload = {
      fields: [],
      ...values
    };

    const { success } = await axCreateTemplate(payload);

    if (success) {
      notification(t("template:update.success"), NotificationType.Success);
      router.push("/template/list");
    } else {
      notification(t("template:update.error"));
    }
  };

  return (
    <div>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <TextBoxField name="shortName" isRequired={true} label={t("form:short_name")} />
            <TextBoxField name="name" isRequired={true} label={t("form:name")} />
            <SelectMultipleInputField
              name="platform"
              isRequired={true}
              label={t("form:platform.title")}
              options={translateOptions(t, PLATFORM_OPTIONS)}
            />
            <SelectMultipleInputField
              name="permissions"
              label={t("form:permission.title")}
              options={roles}
            />
          </SimpleGrid>
          <TextAreaField name="description" isRequired={true} label={t("form:description")} />
          <SubmitButton colorScheme="green">{t("common:save")}</SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
