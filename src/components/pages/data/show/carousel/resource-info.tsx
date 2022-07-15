import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface CarouselResourceInfoProps {
  currentResource;
  templateId?;
}

function CarouselResourceInfo({ currentResource }: CarouselResourceInfoProps) {
  if (!currentResource) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <Box position="absolute" top={4} right={0} left={4} display="flex">
      <Popover placement="bottom-start" closeOnBlur={false} isLazy={true}>
        <PopoverTrigger>
          <IconButton
            aria-label={t("form:resource_info")}
            icon={<InfoOutlineIcon />}
            zIndex={4}
            opacity={0.4}
            isRound={true}
            _hover={{ opacity: 1 }}
          />
        </PopoverTrigger>
        <PopoverContent zIndex={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{t("form:resource_info")}</PopoverHeader>
          <PopoverBody>
            <Grid templateColumns="1fr 2fr" gap={3}>
              <Box>{t("form:attribution")}:</Box>
              <Box title={currentResource?.attribution} noOfLines={1}>
                {currentResource?.attribution || "NA"}
              </Box>

              <Box>{t("form:license")}:</Box>
              <Box>{currentResource?.license}</Box>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default CarouselResourceInfo;
