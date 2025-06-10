import { Input, InputGroup } from "@chakra-ui/react";
import { parseToDateObject } from "@utils/date";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import DatePicker from "react-datepicker";
import { useController } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";

import { Field } from "../ui/field";
import { FormLabel } from "./common";

interface IDatePickerBoxProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  disableInput?: boolean;
  hint?: string;
  dateFormat?: string;
  style?;
  hasMaxDate?: boolean;
  isRequired?: boolean;
  isClearable?;
  min?;
  max?;
  isLargeVariant?;
}

export const DateRangePickerField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  disabled,
  hasMaxDate = true,
  isLargeVariant,
  isClearable,
  isRequired,
  min,
  max,
  ...props
}: IDatePickerBoxProps) => {
  const { field, fieldState } = useController({ name });
  const maxDate = hasMaxDate ? new Date().setHours(23, 59, 59, 999) : null; // End of Day

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
            <LuCalendar color="gray.300" />
          </label>
        }
        width={"full"}
      >
        <DatePicker
          id={name}
          selectsRange={true}
          disabled={disabled}
          startDate={parseToDateObject(field?.value?.[0])}
          endDate={parseToDateObject(field?.value?.[1])}
          onChange={(v) => field.onChange(v)}
          dateFormat="dd/MM/yyyy"
          customInput={<Input />}
          minDate={min}
          maxDate={max || maxDate}
          isClearable={isClearable}
          {...props}
        />
      </InputGroup>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
