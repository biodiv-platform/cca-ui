import { Button, Stack } from "@chakra-ui/react";
import { namedFormErrorMessage, optionLabelShow } from "@utils/field";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { Radio, RadioGroup } from "../ui/radio";
import { FormLabel, OthersInput } from "./common";

interface IRadioProps {
  helpText?: string;
  label?: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  hint?: string;
  options?: any[];
  isInline?: boolean;
  isLargeVariant?;
  isOthers?;
  isClearable?;
  isRequired?;
  disabled?: boolean;
}

export const RadioInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  disabled,
  isInline = true,
  options = [],
  isLargeVariant,
  isOthers,
  isClearable,
  isRequired,
  ...props
}: IRadioProps) => {
  const { field, fieldState } = useController({ name });
  const { t } = useTranslation();

  const handleOnReset = () => field.onChange("");

  return (
    <Field
      invalid={!!fieldState.error}
      mb={mb}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
      {...props}
    >
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
        required={isRequired}
      />
      <RadioGroup id={name} {...field} colorPalette="blue" disabled={disabled}>
        <Stack direction={isInline ? "row" : "column"} py={2}>
          {options.map((o) => (
            <Radio key={o.value} value={o.value} disabled={disabled}>
              {optionLabelShow(o.label)}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      {isOthers && <OthersInput name={name} value={field.value} />}

      {isClearable && (
        <Button onClick={handleOnReset} size="xs" variant={"subtle"}>
          {t("common:clear")}
        </Button>
      )}

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
