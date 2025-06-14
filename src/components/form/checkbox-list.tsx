import { Box, CheckboxGroup, Stack } from "@chakra-ui/react";
import { namedFormErrorMessage, optionLabelShow } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { FormLabel, OthersInput } from "./common";

interface ICheckboxListProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  options?;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  isLargeVariant?;
  isOthers?: boolean;
  isRequired?: boolean;
}

export const CheckboxListField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  options = [],
  mb = 4,
  hint,
  disabled,
  isLargeVariant,
  isOthers,
  isRequired,
  ...props
}: ICheckboxListProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: []
  });

  const value = Array.isArray(field.value) ? field.value : [];

  const handleChange = (selectedValues: string[]) => {
    field.onChange(selectedValues);
  };

  return (
    <Box mb={mb}>
      <Field
        invalid={!!fieldState.error}
        {...props}
        errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
      >
        <FormLabel
          isLargeVariant={isLargeVariant}
          title={title}
          label={label}
          name={name}
          helpText={helpText}
          required={isRequired}
        />
      </Field>
      <CheckboxGroup
        value={value}
        onValueChange={handleChange}
        isDisabled={disabled}
        colorPalette="blue"
      >
        <Stack id={name}>
          {options.map((option) => (
            <Checkbox
              key={option.value}
              disabled={option?.isDisabled}
              value={option.value}
              required={field.value.length <= 0 && isRequired}
            >
              {optionLabelShow(option.label)}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      {isOthers && <OthersInput name={name} value={field.value} />}

      {hint && <Field color="gray.600" helperText={hint} />}
    </Box>
  );
};
