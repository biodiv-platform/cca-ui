import WYSIWYGEditor from "@components/@core/wysiwyg-editor";
import { namedFormErrorMessage } from "@utils/field";
import React, { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import { FormLabel } from "./common";
import { Field } from "@chakra-ui/react";

interface IWYSIWYGFieldProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mt?: number;
  mb?: number;
  hint?: string;
  uploadHandler?;
  fileUploadHandler?;
  isLargeVariant?;
  isRequired?;
}

const WYSIWYGField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  uploadHandler,
  fileUploadHandler,
  isLargeVariant,
  isRequired,
  ...props
}: IWYSIWYGFieldProps) => {
  const { field, fieldState } = useController({ name });
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (fieldState.error && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [fieldState.error]);

  return (
    <Field.Root
      invalid={!!fieldState.error}
      required={isRequired}
      mb={mb}
      color="gray.600"
      ref={wrapperRef}
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
      <WYSIWYGEditor
        name={name}
        id={name}
        value={field.value}
        onEditorChange={field.onChange}
        placeholder={label}
        onBlur={field.onBlur}
        uploadHandler={uploadHandler}
        fileUploadHandler={fileUploadHandler}
      >
        {label}
      </WYSIWYGEditor>
      {hint && <Field.HelperText>{hint}</Field.HelperText>}
      <Field.ErrorText>
        {namedFormErrorMessage(fieldState?.error?.message, name, title)}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default WYSIWYGField;
