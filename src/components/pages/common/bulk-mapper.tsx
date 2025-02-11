import { Button, ButtonGroup } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuRepeat, LuSettings } from "react-icons/lu";

export default function BulkMapperHeader({ bulkIds, handleBulkCheckbox, openBulkMappingModal }) {
  const { t } = useTranslation();

  return (
    bulkIds &&
    bulkIds?.length > 0 && (
      <ButtonGroup size="sm" variant="outline">
        <Button
          variant="outline"
          colorPalette="red"
          onClick={() => handleBulkCheckbox("UnsSelectAll")}
        >
          <LuRepeat />
          {t("common:actions.unselect_all")}
        </Button>
        <Button variant="outline" colorPalette="green" onClick={openBulkMappingModal}>
          <LuSettings />
          {t("common:actions.title")}
        </Button>
      </ButtonGroup>
    )
  );
}
