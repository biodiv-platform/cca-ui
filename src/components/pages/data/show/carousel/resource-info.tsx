import { Box, Grid, IconButton } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuInfo } from "react-icons/lu";

import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger
} from "@/components/ui/popover";

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
      <PopoverRoot
        positioning={{ placement: "bottom-start" }}
        closeOnInteractOutside={false}
        lazyMount={true}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label={t("form:resource_info")}
            zIndex={4}
            opacity={0.4}
            _hover={{ opacity: 1 }}
            variant={"subtle"}
            rounded={"full"}
          >
            <LuInfo />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent zIndex={4}>
          <PopoverArrow />
          <PopoverCloseTrigger />
          <PopoverHeader>{t("form:resource_info")}</PopoverHeader>
          <PopoverBody>
            <Grid templateColumns="1fr 2fr" gap={3}>
              <Box>{t("form:attribution")}:</Box>
              <Box title={currentResource?.attribution} maxLines={1}>
                {currentResource?.attribution || "NA"}
              </Box>

              <Box>{t("form:license")}:</Box>
              <Box>{currentResource?.license}</Box>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Box>
  );
}

export default CarouselResourceInfo;
