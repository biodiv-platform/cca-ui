import { Box, CloseButton, Image } from "@chakra-ui/react";
import { axUploadUserGroupResource } from "@services/files.service";
import { resizeImage } from "@utils/image";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";

import { Field } from "@/components/ui/field";

import { Container, ITPageGalleryFieldProps } from "./gallery-field";

export const SocialPreviewField = ({
  helpText,
  label,
  name,
  mb = 4,
  hint,
  isRequired,
  hidden,
  ...props
}: ITPageGalleryFieldProps) => {
  const { t } = useTranslation();
  const { field } = useController({ name });

  const [isProcessing, setIsProcessing] = useState(false);
  const { formState } = useFormContext();

  const onDrop = async ([file]) => {
    if (!file) return;

    setIsProcessing(true);
    const [fileSm] = await resizeImage(file);
    const { success, data } = await axUploadUserGroupResource(
      new File([fileSm], file.name),
      "pages"
    );
    if (success) {
      field.onChange(data);
    } else {
      notification(t("user:update_error"));
    }
    setIsProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"]
    },
    multiple: false,
    onDrop
  });

  const handleOnRemove = (e) => {
    e.stopPropagation();
    field.onChange("");
  };

  return (
    <Field
      invalid={!!formState.errors[name]}
      errorText={formState?.errors?.[name]?.message?.toString()}
      mb={mb}
      hidden={hidden}
      required={isRequired}
      {...props}
    >
      {label && <Field htmlFor={name} label={label} />}

      {/* Dropzone */}
      <div id={name}>
        <Container
          style={{ height: "124px", padding: "1rem", position: "relative" }}
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          {field.value ? (
            <Box maxW={"180px"}>
              <Image
                src={getNextResourceThumbnail(RESOURCE_CTX.PAGES, field.value, "?h=200")}
                alt={field.value}
                maxH="120px"
                objectFit="cover"
                borderRadius="md"
              />
              <CloseButton top={0} right={0} position="absolute" onClick={handleOnRemove} />
            </Box>
          ) : isProcessing ? (
            <p>{t("common:loading")}</p>
          ) : (
            <>
              <p>
                <span style={{ display: "block" }}>{t("form:uploader.label")}</span>
                <span style={{ display: "block", fontSize: "0.8em" }}>
                  {t("form:recommended_social_preview")}
                </span>
              </p>
            </>
          )}
        </Container>
      </div>

      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
