import { Box } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { Field } from "../ui/field";
import { FormLabel, OthersInput } from "./common";
import { selectStyles } from "./configs";

interface SelectMultipleProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  optionComponent?: any;
  selectRef?;
  isRequired?: boolean;
  isSearchable?: boolean;
  isLargeVariant?;
  isClearable?;
  isOthers?;
}

const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectMultipleInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  optionComponent = DefaultOptionComponent,
  options = [],
  disabled,
  selectRef,
  isRequired,
  isSearchable,
  isClearable,
  isLargeVariant,
  isOthers,
  ...props
}: SelectMultipleProps) => {
  const { field, fieldState } = useController({ name });
  const initialValue = options.filter((v) => (field.value || []).includes(v.value));

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
      className="dropdown"
      aria-invalid={fieldState.invalid}
      mb={mb}
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
      <Box width={"full"}>
        <Select
          id={name}
          instanceId={name}
          inputId={name}
          onChange={(o) => field.onChange(o ? o.map(({ value }) => value) : [])}
          onBlur={field.onBlur}
          options={options}
          components={{
            Option: optionComponent
          }}
          defaultValue={initialValue}
          isSearchable={true}
          isMulti={true}
          isClearable={isClearable}
          isDisabled={disabled}
          styles={selectStyles}
          ref={selectRef}
        />
      </Box>

      {isOthers && <OthersInput name={name} value={field.value} />}

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
