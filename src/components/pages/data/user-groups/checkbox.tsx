import { Box, Flex, Image, SimpleGrid, useCheckbox, useCheckboxGroup } from "@chakra-ui/react";
import React from "react";

interface ITraitInputProps {
  type?: string;
  options: any[];
  gridColumns?;
  onBlur?;
  onChange;
  defaultValue?;
}

const CustomCheckBox = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  return (
    <label>
      <input {...getInputProps()} required={false} />
      <Box
        {...getCheckboxProps()}
        p={2}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        bg="white"
        _checked={{
          borderColor: "blue.500",
          bg: "blue.50"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        style={undefined}
      >
        {props.children}
      </Box>
    </label>
  );
};

const CheckBoxItems = ({
  options,
  onChange,
  defaultValue,
  gridColumns = [1, 1, 3, 5]
}: ITraitInputProps) => {
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: defaultValue && defaultValue.map((o) => o.toString()),
    onChange: (v) => onChange(v.map((i) => Number(i)))
  });

  console.warn("options", options);

  return (
    <SimpleGrid columns={gridColumns} gridGap={4}>
      {options.map((o) => {
        console.warn("0", o);
        return (
          <CustomCheckBox key={o.id} {...getCheckboxProps({ value: String(o.id) })}>
            <Flex alignItems="center" h="2rem" overflow="hidden" title={o.name}>
              <Image
                loading="lazy"
                ignoreFallback={true}
                boxSize="2rem"
                mr={2}
                objectFit="contain"
                src={o.id === "null" ? o.icon : o.icon + "?h=32"}
                alt={o.name}
              />
              <Box lineHeight="1rem" className="elipsis-2">
                {o.name}
              </Box>
            </Flex>
          </CustomCheckBox>
        );
      })}
    </SimpleGrid>
  );
};

export default CheckBoxItems;
