import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function Dots({ slidesLength, moveTo, currentSlide }) {
  return (
    <Box
      position="absolute"
      display="flex"
      gap={2}
      justifyContent="center"
      bottom={0}
      left={0}
      right={0}
      m={6}
    >
      {new Array(slidesLength).fill(0).map((_, idx) => (
        <Button
          key={idx}
          onClick={() => moveTo(idx)}
          bg={currentSlide === idx ? "white" : "whiteAlpha.500"}
          boxSize="0.8em"
          p={0}
          minW="auto"
          borderRadius="50%"
        />
      ))}
    </Box>
  );
}
