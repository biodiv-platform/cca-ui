import { Button, Dialog, SimpleGrid } from "@chakra-ui/react";
import { CheckboxField } from "@components/form/checkbox";
import { DateRangePickerField } from "@components/form/daterangepicker";
import { NumberRangeField } from "@components/form/number-range";
import { OptionsField } from "@components/form/option";
import { SelectInputField } from "@components/form/select";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import { YearRangePickerField } from "@components/form/yearrangepicker";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FORM_TYPE,
  FORM_TYPE_OPTIONS,
  MINMAX_DATE_FORM_TYPES,
  MINMAX_FORM_TYPES,
  NON_FILTERABLE_FORM_TYPES,
  OPTION_FORM_TYPES
} from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import useTemplate from "../../use-template";

export default function UpdateFieldForm({ defaultValues, onClose }) {
  const { t } = useTranslation();
  const { createOrUpdateField, template, areFieldsReadOnly } = useTemplate();

  const hForm = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        fieldId: Yup.string().required(),
        name: Yup.string().required(),
        question: Yup.string().required(),
        helpText: Yup.string().notRequired(),
        type: Yup.string().required(),
        isRequired: Yup.boolean().nullable(),
        isSummaryField: Yup.boolean().nullable(),
        isTitleColumn: Yup.boolean().nullable(),
        isFilterable: Yup.boolean().nullable(),
        minMax: Yup.mixed().nullable(),
        valueOptions: Yup.array().when("type", {
          is: (m) => OPTION_FORM_TYPES.includes(m),
          then: Yup.array()
            .of(
              Yup.object({
                label: Yup.string().required(),
                value: Yup.string().required()
              })
            )
            .min(1)
            .required(),
          otherwise: Yup.array().nullable()
        })
      })
    ),
    defaultValues
  });

  const formType = hForm.watch("type");
  const isOptionsRequired = useMemo(() => OPTION_FORM_TYPES.includes(formType), [formType]);

  const handleOnSubmit = ({ isNew, valueOptions, ...values }) => {
    createOrUpdateField({
      ...values,
      valueOptions: valueOptions.length ? valueOptions : undefined
    });
  };

  return (
    <Dialog.Content>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <Dialog.Header fontSize={"xl"} fontWeight={"bold"}>
            {t("template:manage_field")} ({SITE_CONFIG.LANG.LIST[template.language].NAME})
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <SimpleGrid columns={[1, 1, 2, 2]} gap={4}>
              <TextBoxField name="fieldId" disabled={true} label={t("form:field_id")} />
              <TextBoxField name="name" isRequired={true} label={t("form:name")} />
            </SimpleGrid>
            <TextAreaField name="question" isRequired={true} label={t("form:question")} />
            <TextAreaField name="helpText" label={t("form:help_text")} />
            <SelectInputField
              name="type"
              isRequired={true}
              disabled={!defaultValues.isNew}
              label={t("form:type")}
              options={FORM_TYPE_OPTIONS}
            />

            <CheckboxField
              disabled={areFieldsReadOnly}
              name="isSummaryField"
              label={t("form:is_summary")}
            />
            <CheckboxField
              disabled={areFieldsReadOnly}
              name="isTitleColumn"
              label={t("form:is_title")}
            />
            {!NON_FILTERABLE_FORM_TYPES.includes(formType) && (
              <CheckboxField
                disabled={areFieldsReadOnly}
                name="isFilterable"
                label={t("form:is_filterable")}
              />
            )}
            <CheckboxField
              disabled={areFieldsReadOnly}
              name="isRequired"
              label={t("form:is_required")}
            />
            {MINMAX_FORM_TYPES.includes(formType) && (
              <SimpleGrid columns={2} gap={4}>
                <NumberRangeField
                  disabled={areFieldsReadOnly}
                  name="minMax"
                  label={t("form:range")}
                />
              </SimpleGrid>
            )}
            {MINMAX_DATE_FORM_TYPES.includes(formType) && (
              <SimpleGrid columns={2} gap={4}>
                {formType === FORM_TYPE.YEAR ? (
                  <YearRangePickerField
                    disabled={areFieldsReadOnly}
                    name="minMax"
                    hasMaxDate={false}
                    isClearable={true}
                    label={t("form:range")}
                  />
                ) : (
                  <DateRangePickerField
                    disabled={areFieldsReadOnly}
                    name="minMax"
                    hasMaxDate={false}
                    isClearable={true}
                    label={t("form:range")}
                  />
                )}
              </SimpleGrid>
            )}
            <OptionsField
              name="valueOptions"
              isRequired={isOptionsRequired}
              hidden={!isOptionsRequired}
              disableValues={areFieldsReadOnly}
              label={t("form:options.title")}
            />
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant={"subtle"} mr={3} onClick={onClose}>
              {t("common:close")}
            </Button>
            <SubmitButton>{t("common:save")}</SubmitButton>
          </Dialog.Footer>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}
