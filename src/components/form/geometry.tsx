import { GMAP_FEATURE_TYPES, NakshaGmapsDraw } from "@biodiv-platform/naksha-gmaps-draw";
import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import styled from "@emotion/styled";
import DeleteIcon from "@icons/delete";
import FileIcon from "@icons/file";
import LocationIcon from "@icons/location";
import { namedFormErrorMessage } from "@utils/field";
import { getMapCenter } from "@utils/location";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { LuCircleCheck, LuSearch, LuX } from "react-icons/lu";

import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { FormLabel } from "./common";
import CustomModal from "./custom-modal";

const MapContainerBox = styled.div`
  position: relative;
  .map-toolbar > div {
    width: 50%;
  }
`;

interface IGeometryProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
  isLargeVariant?;
}

const defaultViewPort = getMapCenter(2.8);

export const GeometryField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  isLargeVariant,
  ...props
}: IGeometryProps) => {
  const gmapsSearchRef = useRef<any>(null);
  const { t } = useTranslation();
  const { field, fieldState } = useController({ name, defaultValue: [] });
  const { open, onClose } = useDisclosure();

  return (
    <Field
      invalid={!!fieldState.error}
      mb={mb}
      required={isRequired}
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
        <MapContainerBox id={name}>
          <NakshaGmapsDraw
            defaultViewState={defaultViewPort}
            defaultDrawingMode={GMAP_FEATURE_TYPES.POINT}
            data={field.value}
            isAutocomplete={true}
            isMultiple={true}
            isImport={true}
            onDataChange={field.onChange}
            gmapRegion={SITE_CONFIG.MAP.COUNTRY}
            autoCompleteRegion=""
            gmapAccessToken={SITE_CONFIG.TOKENS.GMAP}
            mapStyle={{ height: "22rem", width: "100%", borderRadius: ".25rem" }}
            maxZoom={14}
            autocompleteComponent={
              <InputGroup mb={4} startElement={<LuSearch color="gray.300" />} width={"full"}>
                <Input
                  name="search-gmaps"
                  ref={gmapsSearchRef}
                  placeholder={t("form:find_gmaps")}
                  w="full"
                  required={false}
                />
              </InputGroup>
            }
            importInputComponent={
              <Input
                name="raw-input"
                placeholder={t("form:geometry_hint")}
                required={false}
                mx={4}
              />
            }
            importModalComponent={
              <CustomModal
                isOpen={open}
                onClose={onClose}
                nakshaImport={undefined}
                geoJSONImport={undefined}
              />
            }
            importButtonComponent={<Button type="button">{t("common:add")}</Button>}
            importDeleteIcon={<DeleteIcon />}
            importLocationIcon={<LocationIcon />}
            importFileIcon={<FileIcon />}
            importSuccessIcon={<LuCircleCheck />}
            importFailureIcon={<LuX />}
            importButtonComponentModal={
              <Button type="button" variant={"subtle"}>
                {t("common:import")}
              </Button>
            }
          />
        </MapContainerBox>
      </Box>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
