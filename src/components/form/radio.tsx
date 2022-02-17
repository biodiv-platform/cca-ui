import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import { namedFormErrorMessage, optionLabelShow } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

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
}

export const RadioInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  isInline = true,
  options = [],
  isLargeVariant,
  isOthers,
  ...props
}: IRadioProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={fieldState.invalid} mb={mb} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <RadioGroup id={name} key={name} {...field}>
        <Stack direction={isInline ? "row" : "column"} py={2}>
          {options.map((o) => (
            <Radio key={o.value} value={o.value}>
              {optionLabelShow(o.label)}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      {isOthers && <OthersInput name={name} value={field.value} />}

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, title)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
