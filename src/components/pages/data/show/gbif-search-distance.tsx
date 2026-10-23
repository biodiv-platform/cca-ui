import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { GBIFSearchBuffers } from "@services/cca.service";
import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input";
import { Tooltip } from "@/components/ui/tooltip";

export const DEFAULT_GBIF_SEARCH_BUFFERS: GBIFSearchBuffers = { pointBufferKm: 10, bufferKm: 1 };

/** Largest distance externalOccurrences accepts (gbif_max_buffer_km) */
const MAX_BUFFER_KM = 100;

interface GBIFSearchDistanceProps {
  value: GBIFSearchBuffers;
  onApply: (value: GBIFSearchBuffers) => void;
  hasPoint: boolean;
  hasShape: boolean;
}

const isValid = (km: string) => km.trim() !== "" && Number(km) >= 0 && Number(km) <= MAX_BUFFER_KM;

const DistanceInput = ({ label, value, onChange }) => (
  <HStack gap={2}>
    <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
      {label}
    </Text>
    <NumberInputRoot
      value={value}
      onValueChange={(e) => onChange(e.value)}
      min={0}
      max={MAX_BUFFER_KM}
      step={1}
      size="xs"
      w="5rem"
      bg="white"
      invalid={!isValid(value)}
    >
      <NumberInputField aria-label={`${label} (km)`} />
    </NumberInputRoot>
    <Text fontSize="sm" color="gray.600">
      km
    </Text>
  </HStack>
);

/**
 * Lets the user choose how far around the CCA GBIF records are searched. Edits are
 * kept as a draft and only applied (refreshing the biodiversity panels) on Apply.
 */
export default function GBIFSearchDistance({
  value,
  onApply,
  hasPoint,
  hasShape
}: GBIFSearchDistanceProps) {
  const [pointKm, setPointKm] = useState(String(value.pointBufferKm));
  const [shapeKm, setShapeKm] = useState(String(value.bufferKm));

  // Keep the draft in step when the applied value changes (e.g. on reset)
  useEffect(() => {
    setPointKm(String(value.pointBufferKm));
    setShapeKm(String(value.bufferKm));
  }, [value.pointBufferKm, value.bufferKm]);

  if (!hasPoint && !hasShape) {
    return null;
  }

  const valid = (!hasPoint || isValid(pointKm)) && (!hasShape || isValid(shapeKm));
  const draft: GBIFSearchBuffers = {
    pointBufferKm: hasPoint && isValid(pointKm) ? Number(pointKm) : value.pointBufferKm,
    bufferKm: hasShape && isValid(shapeKm) ? Number(shapeKm) : value.bufferKm
  };
  const changed = draft.pointBufferKm !== value.pointBufferKm || draft.bufferKm !== value.bufferKm;
  const isDefault =
    value.pointBufferKm === DEFAULT_GBIF_SEARCH_BUFFERS.pointBufferKm &&
    value.bufferKm === DEFAULT_GBIF_SEARCH_BUFFERS.bufferKm;

  return (
    <Stack gap={1}>
      <HStack gap={{ base: 3, md: 5 }} wrap="wrap" rowGap={2}>
        <HStack gap={1}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
            Buffered distance
          </Text>
          <Tooltip content="GBIF records are counted within this distance of the CCA. Apply to refresh the species groups, IUCN categories, map and species list.">
            <Box color="gray.500" cursor="help" display="flex" alignItems="center">
              <IoInformationCircleOutline size={16} />
            </Box>
          </Tooltip>
        </HStack>
        {hasShape && (
          <DistanceInput
            label={hasPoint ? "Around the boundary" : "Around the CCA"}
            value={shapeKm}
            onChange={setShapeKm}
          />
        )}
        {hasPoint && (
          <DistanceInput
            label={hasShape ? "Around the point" : "Around the CCA location"}
            value={pointKm}
            onChange={setPointKm}
          />
        )}
        <HStack gap={1} ml={{ md: "auto" }}>
          <Button
            size="xs"
            colorPalette="teal"
            disabled={!valid || !changed}
            onClick={() => onApply(draft)}
          >
            Apply
          </Button>
          <Button
            size="xs"
            variant="ghost"
            colorPalette="gray"
            disabled={isDefault && !changed}
            onClick={() => {
              setPointKm(String(DEFAULT_GBIF_SEARCH_BUFFERS.pointBufferKm));
              setShapeKm(String(DEFAULT_GBIF_SEARCH_BUFFERS.bufferKm));
              onApply(DEFAULT_GBIF_SEARCH_BUFFERS);
            }}
          >
            Reset
          </Button>
        </HStack>
      </HStack>
      {!valid && (
        <Text fontSize="xs" color="red.600">
          Enter a distance from 0 to {MAX_BUFFER_KM} km.
        </Text>
      )}
    </Stack>
  );
}
