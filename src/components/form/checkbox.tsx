import React from "react";
import { useController } from "react-hook-form";

import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";

interface ITextBoxProps {
  name: string;
  label: string;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  hint?: string;
}

export const CheckboxField = ({ name, label, mb = 4, hint, disabled, ...props }: ITextBoxProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState
  } = useController({ name });

  return (
    <Field invalid={!!fieldState.error} mb={mb} errorText={fieldState?.error?.message} {...props}>
      <Checkbox
        name={name}
        onChange={(e) => onChange(e.target["checked"])}
        colorPalette={"blue"}
        onBlur={onBlur}
        defaultChecked={value}
        disabled={disabled}
        id={name}
      >
        {label}
      </Checkbox>

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
