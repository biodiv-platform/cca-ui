import { Box, Input } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import styled from "@emotion/styled";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import MobileInput from "react-phone-number-input";

import { Field } from "../ui/field";
import { FormLabel } from "./common";

const PhoneFormControl = styled.div`
  .PhoneInput {
    position: relative;
    input {
      padding-left: 3rem;
    }
    .PhoneInputCountryIconUnicode,
    .PhoneInputCountryIcon {
      line-height: 2.5rem;
      padding: 0 0.7rem;
      font-size: 1.4rem;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
    }
    select {
      display: none;
    }
  }
`;

interface ISelectProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  defaultCountry?: string;
  onBlur?;
  isLargeVariant?;
  isRequired?;
}

export const PhoneNumberInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  defaultCountry = SITE_CONFIG.MAP.COUNTRY,
  disabled = false,
  isLargeVariant,
  isRequired,
  ...props
}: ISelectProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      as={PhoneFormControl}
      invalid={!!fieldState.error}
      mb={mb}
      id={name}
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
      <Box width={"full"}>
        <MobileInput
          id={name}
          inputComponent={Input}
          countrySelectProps={{ unicodeFlags: true }}
          defaultCountry={defaultCountry as any}
          disabled={disabled}
          {...field}
        />
      </Box>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
