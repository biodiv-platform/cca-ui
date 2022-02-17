import { SimpleGrid } from "@chakra-ui/react";
import PageHeading from "@components/@core/page-heading";
import { SelectInputField } from "@components/form/select";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import { PLATFORM_OPTIONS } from "@components/pages/register/form/options";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import { Role } from "@interfaces/custom";
import { translateOptions } from "@utils/translation";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import useTemplate from "./use-template";

export function EditTemplateMetaForm() {
  const { template, setMeta, areFieldsReadOnly, templateList } = useTemplate();
  const { t } = useTranslation();

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
        parentName: Yup.string().nullable(),
        description: Yup.string().required()
      })
    ),
    defaultValues: {
      shortName: template.shortName,
      name: template.name,
      platform: template.platform,
      permissions: template.permissions,
      parentName: template.parentName,
      description: template.description
    }
  });

  const handleOnSubmit = async (values) => {
    setMeta(values);
  };

  return (
    <div>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <PageHeading size="lg" title={t("template:update.title")}>
            <SubmitButton colorScheme="blue" leftIcon={<CheckIcon />}>
              {t("common:save")}
            </SubmitButton>
          </PageHeading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <TextBoxField
              name="shortName"
              disabled={areFieldsReadOnly}
              isRequired={true}
              label={t("form:short_name")}
            />
            <TextBoxField name="name" isRequired={true} label={t("form:name")} />
            <SelectInputField
              name="parentName"
              disabled={areFieldsReadOnly}
              isClearable={true}
              label={t("form:parent_name")}
              options={templateList}
            />
            <SelectMultipleInputField
              name="platform"
              disabled={areFieldsReadOnly}
              isRequired={true}
              label={t("form:platform.title")}
              options={translateOptions(t, PLATFORM_OPTIONS)}
            />
            <SelectMultipleInputField
              name="permissions"
              disabled={areFieldsReadOnly}
              label={t("form:permission.title")}
              options={roles}
            />
          </SimpleGrid>
          <TextAreaField
            name="description"
            isRequired={true}
            label={t("form:description")}
            mb={20}
          />
        </form>
      </FormProvider>
    </div>
  );
}
