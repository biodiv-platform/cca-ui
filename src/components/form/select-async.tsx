import { Box } from "@chakra-ui/react";
import { MENU_PORTAL_TARGET } from "@static/constants";
import debounce from "debounce-promise";
import React, { useEffect, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import AsyncSelectCreatable from "react-select/async-creatable";

import { Field } from "../ui/field";
import { selectStyles } from "./configs";

interface ISelectProps {
  name: string;
  label?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  multiple?: boolean;
  style?: any;
  onQuery?: any;
  debounceTime?: number;
  optionComponent?: any;
  placeholder?: string;
  isCreatable?: boolean;
  onChange?;
  eventCallback?;
  selectRef?;
  isRequired?: boolean;
  isClearable?;
  resetOnSubmit?;
  isRaw?;
}

const dummyOnQuery = (q) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ label: `async-${q}`, value: "vx" }]);
    }, 1000);
  });

const DefaultOptionComponent = (p: any) => <components.Option {...p} />;

export const SelectAsyncInputField = ({
  name,
  label,
  hint,
  mb = 4,
  options = [],
  multiple,
  disabled,
  optionComponent = DefaultOptionComponent,
  debounceTime = 200,
  placeholder,
  onChange,
  eventCallback,
  isCreatable = true,
  selectRef,
  isRequired,
  onQuery = dummyOnQuery,
  resetOnSubmit = true,
  isClearable = true,
  isRaw,
  ...props
}: ISelectProps) => {
  const form = useFormContext();
  const { field, fieldState } = useController({ name });
  const Select: any = useMemo(
    () => (isCreatable ? AsyncSelectCreatable : AsyncSelect),
    [isCreatable]
  );

  const onQueryDebounce = debounce(onQuery, debounceTime);
  const [selected, setSelected] = useState(
    field.value ? (multiple ? field.value : isRaw ? field.value : { value: field.value }) : null
  );

  useEffect(() => {
    field.onChange(multiple ? selected : selected?.value);
    if (onChange && selected) {
      onChange(selected);
    }
  }, [selected]);

  const handleOnChange = (value, event) => {
    eventCallback ? eventCallback(value, event, setSelected) : setSelected(value);
  };

  useEffect(() => {
    if (resetOnSubmit && form.formState.submitCount) {
      setSelected(multiple ? [] : null);
    }
  }, [form.formState.submitCount]);

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={fieldState?.error?.message}
      aria-invalid={fieldState.invalid}
      required={isRequired}
      mb={mb}
      {...props}
    >
      {label && <Field htmlFor={name} label={label} />}
      <Box width={"full"}>
        <Select
          name={name}
          inputId={name}
          formatCreateLabel={(v) => `Add "${v}"`}
          isMulti={multiple}
          defaultOptions={options}
          loadOptions={onQueryDebounce}
          menuPortalTarget={MENU_PORTAL_TARGET}
          components={{
            Option: optionComponent,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          value={selected}
          isSearchable={true}
          isDisabled={disabled}
          isClearable={isClearable}
          onChange={handleOnChange}
          placeholder={placeholder || label}
          noOptionsMessage={() => null}
          styles={selectStyles}
          ref={selectRef}
        />
      </Box>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
