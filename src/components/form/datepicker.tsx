import { Input } from "@chakra-ui/react";
import CalendarIcon from "@icons/calendar";
import { parseToDateObject } from "@utils/date";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import DatePicker from "react-datepicker";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { FormLabel } from "./common";

interface IDatePickerBoxProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  dateFormat?: string;
  style?;
  isRequired?: boolean;
  isLargeVariant?;
  isClearable?;
}

const maxDate = new Date().setHours(23, 59, 59, 999); // End of Day

export const DatePickerField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  disabled,
  isLargeVariant,
  isClearable,
  isRequired,
  ...props
}: IDatePickerBoxProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      mb={mb}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, title)}
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
      <InputGroup
        endElement={
          <label htmlFor={name} style={{ cursor: "pointer" }}>
            <CalendarIcon color="gray.300" />
          </label>
        }
      >
        <DatePicker
          id={name}
          selected={parseToDateObject(field.value)}
          onChange={field.onChange}
          dateFormat="dd/MM/yyyy"
          customInput={<Input />}
          maxDate={maxDate}
          isClearable={isClearable}
          {...props}
        />
      </InputGroup>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
