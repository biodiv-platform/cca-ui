import { FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { FormLabel, OthersInput } from "./common";
import { selectStyles } from "./configs";

interface SelectInputFieldProps {
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
  isControlled?: boolean;
  onChangeCallback?;
  shouldPortal?;
  hidden?;
  isOthers?;
  isClearable?;
  isLargeVariant?;
}
const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  options = [],
  disabled,
  selectRef,
  optionComponent = DefaultOptionComponent,
  isRequired,
  isControlled,
  shouldPortal,
  onChangeCallback,
  hidden,
  isLargeVariant,
  isClearable,
  isOthers,
  ...props
}: SelectInputFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl
      isInvalid={fieldState.invalid}
      className="dropdown"
      aria-invalid={fieldState.invalid}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      {...props}
    >
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
      <Select
        id={name}
        instanceId={name}
        inputId={name}
        onChange={(o) => {
          field.onChange(o?.value);
          onChangeCallback && onChangeCallback(o?.value);
        }}
        onBlur={field.onBlur}
        options={options}
        components={{
          Option: optionComponent
        }}
        menuPortalTarget={process.browser && shouldPortal && document.body}
        isSearchable={true}
        isClearable={isClearable}
        isDisabled={disabled}
        styles={selectStyles}
        {...{
          [isControlled ? "value" : "defaultValue"]: options.find((o) => o.value === field.value)
        }}
        ref={selectRef}
      />

      {isOthers && <OthersInput name={name} value={field.value} />}

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, title)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
