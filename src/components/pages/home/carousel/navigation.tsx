import { IconButton } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const carouselNavigationButtonSide = { base: "30%", md: "2rem" };

interface NavigationButtonProps {
  left?;
  right?;
  onClick;
  children;
}

const NavigationButton = ({ left, right, onClick, children }: NavigationButtonProps) => (
  <IconButton
    variant={"subtle"}
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
      children={<LuChevronLeft />}
    />
    <NavigationButton
      right={carouselNavigationButtonSide}
      onClick={() => slider?.slickNext()}
      children={<LuChevronRight />}
    />
  </>
);
