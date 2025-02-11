import { Input } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { FormLabel } from "./common";

interface ITextBoxProps {
  name: string;
  placeholder?: string;
  title?: string;
  label: string;
  helpText?: string;
  type?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
  isLargeVariant?;
}

export const TextBoxField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  type = "text",
  mb = 4,
  disabled,
  hint,
  isRequired,
  maxLength,
  hidden,
  autoComplete,
  isLargeVariant,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: type === "number" ? undefined : "" // to prevent uncontrolled to controlled error
  });

  return (
    <Field
      invalid={!!fieldState.error}
      mb={mb}
      hidden={hidden}
      required={isRequired}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
      {...props}
    >
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <Input
        id={name}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete={autoComplete}
        bg="white"
        {...field}
      />
      {maxLength && field.value && (
        <Field color="gray.600" children={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
