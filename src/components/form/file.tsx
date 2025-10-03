import {
  AspectRatio,
  Box,
  CloseButton,
  IconButton,
  Input,
  SimpleGrid,
  Stack
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { axUploadResource } from "@services/files.service";
import { ACCEPTED_FILE_TYPES, ENDPOINT, LICENSES } from "@static/constants";
import { timeOut } from "@utils/basic";
import { namedFormErrorMessage } from "@utils/field";
import { resizeImage } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useFormContext } from "react-hook-form";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

import { Field } from "../ui/field";
import { FormLabel } from "./common";
import { getMediaElementFromPath } from "./multimedia";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 0.25rem;
  height: 200px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background: #fff;
  border-color: var(--chakra-colors-gray-300);
`;

interface ITFileFieldProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  type?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
  isLargeVariant?;
}

export const FileField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  isLargeVariant,
  ...props
}: ITFileFieldProps) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { formState, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ name });

  const onDrop = async (files) => {
    if (!files?.length) {
      return;
    }
    setIsProcessing(true);

    for (const file of files) {
      let resource;
      if (file.type.startsWith("image/")) {
        const fileSm = await resizeImage(file);
        resource = await axUploadResource(new File([fileSm], file.name));
      } else {
        resource = await axUploadResource(file);
      }

      await timeOut(5000);
      append({
        attribution: "",
        license: LICENSES[1],
        path: `${ENDPOINT.FILES}/get/raw/pages${resource.uri}`
      });
    }

    setIsProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ACCEPTED_FILE_TYPES,
    multiple: true,
    onDrop
  });

  return (
    <Field
      invalid={!!formState.errors[name]}
      errorText={namedFormErrorMessage(formState?.errors?.[name]?.["error"]?.message, name, title)}
      mb={mb}
      hidden={hidden}
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
      <div className="container" id={name}>
        <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          {isProcessing ? (
            <p>Loading...</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
        </Container>
      </div>
      {fields && (
        <SimpleGrid columns={{ base: 4, md: 5 }} gap={4} pt={4} maxW="full">
          {fields?.map((item: any, index) => (
            <Box
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              key={item.id}
              p={2}
              position="relative"
              w="full"
            >
              <CloseButton
                bg="red.500"
                _hover={{ bg: "red.600" }}
                color="white"
                size="sm"
                zIndex={1}
                position="absolute"
                top={0}
                right={0}
                m={4}
                onClick={() => remove(index)}
              />
              <Stack>
                <AspectRatio ratio={1}>{getMediaElementFromPath(item?.path)}</AspectRatio>
                <Input
                  {...register(`${name}.${index}.attribution`)}
                  placeholder={t("form:attribution")}
                />

                <NativeSelectRoot size="sm">
                  <NativeSelectField
                    {...register(`${name}.${index}.license`)}
                    defaultValue={LICENSES[1]}
                    placeholder="Select framework"
                    items={LICENSES}
                  />
                </NativeSelectRoot>
                <SimpleGrid columns={2} gap={2}>
                  <IconButton
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    aria-label={t("common:prev")}
                  >
                    <LuMoveLeft />
                  </IconButton>
                  <IconButton
                    onClick={() => move(index, index + 1)}
                    disabled={index === fields.length - 1}
                    aria-label={t("common:next")}
                  >
                    <LuMoveRight />
                  </IconButton>
                </SimpleGrid>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
