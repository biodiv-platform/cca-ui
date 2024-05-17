import { Accordion, Box, Text } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import { useLocalRouter } from "@components/@core/local-link";
import PageHeading from "@components/@core/page-heading";
import { CheckboxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import Sidebar from "@components/pages/common/layout/sidebar";
import UserGroups from "@components/pages/data/user-groups";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { axSaveParticipation } from "@services/cca.service";
import { FORM_TYPE } from "@static/constants";
import { arrayOfSize, splitIntoGroups, toFlatSaveData } from "@utils/field";
import notification, { NotificationType } from "@utils/notification";
import { buildValidationRules } from "@utils/validation";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import ParticipateTemplateFieldRenderer from "./participate-template-field-renderer";

export default function TemplateParticipateComponent({ template }) {
  const { t, lang } = useTranslation();
  const router = useLocalRouter();
  const { currentGroup } = useGlobalState();

  const [formSchema, templateFields, templateGroups, groupFieldsEnabled] = useMemo(() => {
    const newFields = buildValidationRules(template.fields);
    const hForm = Object.fromEntries(
      newFields
        .filter((field) => field.type !== FORM_TYPE.HEADING)
        .map((field) => [field.fieldId, field.rule])
    );
    const groupFields = splitIntoGroups(newFields);
    const groupFieldsEnabled = arrayOfSize(groupFields.length);
    return [hForm, newFields, groupFields, groupFieldsEnabled];
  }, [lang]);

  const hForm = useForm<any>({
    mode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(
      Yup.object().shape({
        ...formSchema,
        userGroupId: Yup.array(),
        terms: Yup.bool().oneOf([true], "terms must be accepted")
      })
    ),
    defaultValues: {
      terms: true,
      userGroupId: currentGroup.id && currentGroup.id > 0 ? [currentGroup.id.toString()] : []
    }
  });

  const handleOnSubmit = async (values) => {
    const { userGroupId, ...fieldValues } = values;
    const paylod = {
      shortName: template.shortName,
      usergroups: values.userGroupId,
      ccaFieldValues: toFlatSaveData(templateFields, fieldValues)
    };

    const { success, data } = await axSaveParticipation(paylod);

    if (success) {
      notification(t("form:saved.success"), NotificationType.Success);
      router.push(`/data/edit/${data.id}#naksha-gmaps-view`, true);
    } else {
      notification(t("form:saved.error"));
    }
  };

  const handleOnSubmitInvalid = (fields) => {
    document
      ?.getElementById(Object.keys(fields)?.[0])
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Container key={lang}>
      <PageHeading mb={4} title={template.name} icon="📝" />
      <Text mb={10}>{template.description}</Text>

      <Sidebar fields={templateFields} isEdit={false}>
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleOnSubmit, handleOnSubmitInvalid)}>
            <Accordion defaultIndex={groupFieldsEnabled} allowMultiple={true}>
              {templateGroups.map(({ fields }) =>
                fields
                  .filter((field) => field.isRequired)
                  .map((field) => (
                    <Box
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      p={4}
                      key={field.fieldId}
                      mb={6}
                      bg="white"
                      id={field.fieldId}
                      display="flex"
                      style={{ scrollMarginTop: "var(--content-top)" }}
                    >
                      <Box href={`#${field.fieldId}`} color="gray.400" as="a" mr={2}></Box>
                      <ParticipateTemplateFieldRenderer field={field} />
                    </Box>
                  ))
              )}
            </Accordion>
            <UserGroups name="userGroupId" label={t("group:post")} />
            <CheckboxField mt={6} name="terms" label={t("form:terms")} />
            <SubmitButton>{t("form:submit")}</SubmitButton>
          </form>
        </FormProvider>
      </Sidebar>
    </Container>
  );
}
