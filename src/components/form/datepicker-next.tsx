import "react-datepicker/dist/react-datepicker.css";

import { Input, InputGroup } from "@chakra-ui/react";
import CalendarIcon from "@icons/calendar";
import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

import { Field } from "../ui/field";

interface DatePickerNextFieldProps {
  disabled?: boolean;
  hint?: string;
  isRequired?: boolean;
  label?: string;
  mb?: number;
  name: string;
  placeholder?;
  style?;
  dateFormat?;
  singleObservationUpload?: boolean;
  inputRef?;
  inputProps?;
}

const maxDate = new Date().setHours(23, 59, 59, 999); // End of Day

export const DatePickerNextField = ({
  disabled,
  hint,
  label,
  mb = 4,
  name,
  placeholder,
  dateFormat,
  inputProps,
  inputRef,
  ...props
}: DatePickerNextFieldProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field
            invalid={!!fieldState.error}
            mb={mb}
            errorText={fieldState?.error?.message}
            {...props}
          >
            {label && <Field htmlFor={name}>{label}</Field>}
            <InputGroup
              width={"full"}
              endElement={
                <label htmlFor={name} style={{ cursor: "pointer" }}>
                  <CalendarIcon color="gray.300" />
                </label>
              }
            >
              <DatePicker
                ref={inputRef}
                customInput={<Input />}
                dateFormat={dateFormat || "dd-MM-yyyy"}
                isReadOnly={disabled}
                placeholderText={placeholder || label}
                onChange={field.onChange}
                selected={field.value ? new Date(field.value) : undefined}
                maxDate={maxDate}
                portalId={name}
                {...(inputProps || {})}
              />
            </InputGroup>
            {hint && <Field color="gray.600" helperText={hint} />}
          </Field>
        );
      }}
    />
  );
};
