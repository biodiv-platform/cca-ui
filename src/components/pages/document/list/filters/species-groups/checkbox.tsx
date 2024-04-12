import { Box, Image, useCheckbox } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import styled from "@emotion/styled";
import { getLocalIcon } from "@utils/media";
import { toHumanString } from "human-readable-numbers";
import React from "react";

const CheckboxLabel = styled.label`
  cursor: pointer;
  border: 1px solid var(--chakra-colors-gray-300);
  background: var(--chakra-colors-white);
  overflow: hidden;

  img {
    filter: grayscale(1);
    margin: 0 auto;
  }

  .badge {
    background: var(--chakra-colors-gray-500);
    font-size: 0.7rem;
    line-height: 1.2rem;
    color: white;
    text-align: center;
  }

  &[aria-checked="true"] {
    img {
      filter: none;
    }
    .badge {
      background: var(--chakra-colors-blue-500);
    }
  }
`;

const Checkbox = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  return (
    <Tooltip label={props.label} hasArrow={true} placement="top">
      <Box
        {...getCheckboxProps()}
        as={CheckboxLabel}
        borderRadius="md"
        aria-checked={props.isChecked}
        _checked={{
          borderColor: "blue.500",
          bg: "blue.50"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        style={undefined}
      >
        <input {...getInputProps()} required={false} />
        <Image
          boxSize="2.2rem"
          objectFit="contain"
          src={getLocalIcon(props.label)}
          alt={props.label}
          ignoreFallback={true}
        />
        <div className="badge">{toHumanString(props.stat || 0)}</div>
      </Box>
    </Tooltip>
  );
};

export default Checkbox;
