import { Box, chakra, Flex, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { isOthersField } from "@utils/field";
import React, { useMemo } from "react";
import { useController } from "react-hook-form";
import { LuInfo } from "react-icons/lu";

// const RequiredIndicator = () => {
//   const { isRequired } = useFormControl();

//   return isRequired ? <chakra.span css={{ color: "red.500" }} ml={1} children="*" /> : null;
// };

export function FormLabel({ title, label, name, helpText, isLargeVariant }) {
  const { open, onToggle } = useDisclosure();

  return isLargeVariant ? (
    <>
      {(label || title) && (
        <>
          <Flex fontWeight="bold" alignItems="top" mb={1.5}>
            <div>
              <IconButton
                disabled={!helpText}
                type="button"
                minWidth="auto"
                aria-label="toggle"
                onClick={onToggle}
                m={3}
                ml={2}
                mt={1}
              >
                <LuInfo />
              </IconButton>
            </div>
            <div>
              <chakra.label
                fontWeight="normal"
                display="block"
                htmlFor={name}
                mb={0}
                whiteSpace="pre-line"
              >
                <Box fontWeight="bold">
                  {title}
                  {/* <RequiredIndicator /> */}
                </Box>
                {label || title}
              </chakra.label>
            </div>
          </Flex>
        </>
      )}
      {open && (
        <Box
          bg="gray.700"
          className="fade"
          mb={2}
          py={3}
          px={10}
          position="relative"
          borderRadius="md"
        >
          <Box
            bg="gray.700"
            position="absolute"
            top={-1.5}
            left={3}
            boxSize="12px"
            transform="rotate(45deg)"
          />
          <Field.HelperText m={0} color="white" whiteSpace="pre-line" children={helpText} />
        </Box>
      )}
    </>
  ) : label ? (
    <Field.Label htmlFor={name} mb={0} whiteSpace="pre-line">
      {label}
    </Field.Label>
  ) : null;
}

export const OthersInput = ({ name, value }) => {
  const { field } = useController({ name: `others.${name}` });

  const showOthers = useMemo(() => {
    if (!value) return false;

    return Array.isArray(value) ? value?.find((v) => isOthersField(v)) : isOthersField(value);
  }, [value]);

  return showOthers ? <Input mt={4} {...field} /> : null;
};
