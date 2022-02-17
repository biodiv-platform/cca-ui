import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";

const carouselNavigationButtonSide = { base: "30%", md: "2rem" };

interface NavigationButtonProps {
  left?;
  right?;
  onClick;
  children;
}

const NavigationButton = ({ left, right, onClick, children }: NavigationButtonProps) => (
  <IconButton
    aria-label="arrow"
    borderRadius="full"
    position="absolute"
    top={{ base: "80%", md: "50%" }}
    transform={"translate(0%, -50%)"}
    zIndex={2}
    left={left}
    right={right}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

export const NavigationButtons = ({ slider }) => (
  <>
    <NavigationButton
      left={carouselNavigationButtonSide}
      onClick={() => slider?.slickPrev()}
      children={<ChevronLeftIcon />}
    />
    <NavigationButton
      right={carouselNavigationButtonSide}
      onClick={() => slider?.slickNext()}
      children={<ChevronRightIcon />}
    />
  </>
);
