import { Flex } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { Switch } from "../ui/switch";

interface ITextBoxProps {
  name: string;
  label: string;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  color?: string;
  hint?: string;
}

export const SwitchField = ({
  name,
  label,
  mb = 4,
  color = "blue",
  hint,
  disabled,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field invalid={!!fieldState.error} errorText={fieldState?.error?.message} mb={mb} {...props}>
      <Flex>
        <Field htmlFor={name} label={label}></Field>
        <Switch
          id={name}
          onBlur={field.onBlur}
          onChange={(e) => field.onChange(e.target["checked"])}
          defaultChecked={field.value}
          disabled={disabled}
          colorPalette={color}
          name={name}
        />
      </Flex>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
