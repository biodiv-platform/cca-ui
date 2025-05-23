import { Flex } from "@chakra-ui/react";
import { RangeInput } from "@components/@core/range-input";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { FormLabel } from "./common";

interface INumberRangeProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  isRequired?: boolean;
  hidden?;
  step?;
  min?;
  max?;
  isLargeVariant?;
}

export const NumberRangeField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  step,
  min,
  max,
  isLargeVariant,
  ...props
}: INumberRangeProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: [] // to prevent uncontrolled to controlled error
  });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
      mb={mb}
      hidden={hidden}
      required={isRequired}
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
      <Flex alignItems="center" css={{ gap: "10px" }} id={name}>
        <RangeInput
          initialValue={field.value}
          onChange={field.onChange}
          min={min}
          max={max}
          inputProps={{ w: "100px" }}
        />
      </Flex>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
