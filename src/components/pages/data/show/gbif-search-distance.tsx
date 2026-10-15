import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
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
  <Stack gap={1}>
    <Text fontSize="sm" color="gray.700">
      {label}
    </Text>
    <HStack gap={2}>
      <NumberInputRoot
        value={value}
        onValueChange={(e) => onChange(e.value)}
        min={0}
        max={MAX_BUFFER_KM}
        step={1}
        size="sm"
        maxW="7rem"
        invalid={!isValid(value)}
      >
        <NumberInputField />
      </NumberInputRoot>
      <Text fontSize="sm" color="gray.600">
        km
      </Text>
    </HStack>
  </Stack>
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
    <Box borderRadius="md" boxShadow="md" overflow="hidden">
      <Box bg="teal.500" px={6} py={4}>
        <HStack gap={2}>
          <Heading size="md" color="white">
            Search Distance
          </Heading>
          <Tooltip content="GBIF records are counted within this distance of the CCA. Apply to refresh the species groups, IUCN categories, map and species list.">
            <Box color="white" cursor="help" display="flex" alignItems="center">
              <IoInformationCircleOutline size={20} />
            </Box>
          </Tooltip>
        </HStack>
      </Box>

      <Stack bg="white" p={6} gap={4}>
        {hasPoint && (
          <DistanceInput
            label={hasShape ? "Around the CCA's point location" : "Around the CCA location"}
            value={pointKm}
            onChange={setPointKm}
          />
        )}
        {hasShape && (
          <DistanceInput
            label={hasPoint ? "Around the CCA boundary" : "Around the CCA"}
            value={shapeKm}
            onChange={setShapeKm}
          />
        )}
        {!valid && (
          <Text fontSize="sm" color="red.600">
            Enter a distance from 0 to {MAX_BUFFER_KM} km.
          </Text>
        )}
        <HStack gap={2}>
          <Button
            size="sm"
            colorPalette="teal"
            disabled={!valid || !changed}
            onClick={() => onApply(draft)}
          >
            Apply
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={isDefault && !changed}
            onClick={() => {
              setPointKm(String(DEFAULT_GBIF_SEARCH_BUFFERS.pointBufferKm));
              setShapeKm(String(DEFAULT_GBIF_SEARCH_BUFFERS.bufferKm));
              onApply(DEFAULT_GBIF_SEARCH_BUFFERS);
            }}
          >
            Reset to defaults
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
