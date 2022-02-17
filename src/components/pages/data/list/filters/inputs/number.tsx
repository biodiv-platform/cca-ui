import {
  Box,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
} from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import { useDebounce } from "@hooks/use-debounce";
import React, { useEffect, useMemo, useState } from "react";

import useResponseList from "../../use-response-list";

const Slider = ({ value, index }) => (
  <Tooltip label={value} placement="top" hasArrow={true}>
    <RangeSliderThumb boxSizing="border-box" bg="blue.500" index={index} />
  </Tooltip>
);

const NumInput = (props) => (
  <NumberInput {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

export function NumberFilter({ filterField }) {
  const { filter, addFilter, removeFilter, aggregation } = useResponseList();

  const values = useMemo(() => {
    const v = filter.f[filterField.fieldId];
    const [_min, _max] = v ? v.split("-") : [];

    const min = filterField.minMax[0] || aggregation[filterField.fieldId]?.min;
    const max = filterField.minMax[1] || aggregation[filterField.fieldId]?.max;

    return { defaultValue: [_min || min, _max || max], min, max };
  }, [filterField]);

  if (!values.min) {
    return <i>No Data</i>;
  }

  const [rState, setRState] = useState(values.defaultValue);

  const debouncedRState = useDebounce(rState, 300);

  const handleOnChange = (value) => {
    if (value[0] === values.min && value[1] === values.max) {
      removeFilter(filterField.fieldId);
      return;
    }
    addFilter(filterField.fieldId, value.join("-"));
  };

  useEffect(() => {
    handleOnChange(rState);
  }, [debouncedRState]);

  return (
    <Box py={3}>
      <Box pr={3}>
        <RangeSlider
          aria-label={["min", "max"]}
          value={rState}
          min={values.min}
          max={values.max}
          onChange={setRState}
        >
          <RangeSliderTrack bg="gray.300">
            <RangeSliderFilledTrack bg="blue.500" />
          </RangeSliderTrack>
          <Slider value={rState[0]?.toString()} index={0} />
          <Slider value={rState[1]?.toString()} index={1} />
        </RangeSlider>
      </Box>
      <HStack mt={4} spacing={4}>
        <NumInput
          name={`${filterField.fieldId}.0`}
          value={rState[0]}
          onChange={(v) => setRState([Number(v), rState[1]])}
          min={values.min}
          max={values.max}
        />
        <NumInput
          name={`${filterField.fieldId}.1`}
          value={rState[1]}
          onChange={(v) => setRState([rState[0], Number(v)])}
          min={values.min}
          max={values.max}
        />
      </HStack>
    </Box>
  );
}
