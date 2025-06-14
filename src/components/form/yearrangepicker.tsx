import { Box, Input, InputGroup } from "@chakra-ui/react";
import CalendarIcon from "@icons/calendar";
import { parseToDateObject } from "@utils/date";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import DatePicker from "react-datepicker";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { FormLabel } from "./common";

interface YearRangePickerProps {
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
  min?;
  max?;
  isLargeVariant?;
  isClearable?;
}

export const YearRangePickerField = ({
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
}: YearRangePickerProps) => {
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
          <Box hidden={isClearable}>
            <label htmlFor={name} style={{ cursor: "pointer" }}>
              <CalendarIcon color="gray.300" />
            </label>
          </Box>
        }
      >
        <DatePicker
          id={name}
          selectsRange={true}
          disabled={disabled}
          startDate={parseToDateObject(field?.value?.[0])}
          endDate={parseToDateObject(field?.value?.[1])}
          onChange={(v) => field.onChange(v)}
          showYearPicker={true}
          dateFormat="yyyy"
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
