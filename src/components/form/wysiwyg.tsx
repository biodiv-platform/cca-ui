import { FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import WYSIWYGEditor from "@components/@core/wysiwyg-editor";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { FormLabel } from "./common";

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
  ...props
}: IWYSIWYGFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
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

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, title)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};

export default WYSIWYGField;
