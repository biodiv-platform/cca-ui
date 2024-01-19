import { GMAP_FEATURE_TYPES, NakshaGmapsDraw } from "@biodiv-platform/naksha-gmaps-draw";
import { CheckCircleIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure
} from "@chakra-ui/react";
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
  const { isOpen, onClose } = useDisclosure();

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} isRequired={isRequired} {...props}>
      <FormLabel
        isLargeVariant={isLargeVariant}
        title={title}
        label={label}
        name={name}
        helpText={helpText}
      />
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
            <InputGroup mb={4}>
              <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
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
            <Input name="raw-input" placeholder={t("form:geometry_hint")} required={false} mx={4} />
          }
          importModalComponent={
            <CustomModal
              isOpen={isOpen}
              onClose={onClose}
              nakshaImport={undefined}
              geoJSONImport={undefined}
            />
          }
          importButtonComponent={
            <Button type="button" placeholder={t("common:add")} children="Add" />
          }
          importDeleteIcon={<DeleteIcon />}
          importLocationIcon={<LocationIcon />}
          importFileIcon={<FileIcon />}
          importSuccessIcon={<CheckCircleIcon />}
          importFailureIcon={<CloseIcon />}
          importButtonComponentModal={
            <Button type="button" placeholder={t("common:add")} children="Import" />
          }
        />
      </MapContainerBox>
      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, title)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};