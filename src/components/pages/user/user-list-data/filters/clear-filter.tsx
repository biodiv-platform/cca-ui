import { Button } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import useUserListFilter from "@components/pages/user/common/use-user-filter";
import DeleteIcon from "@icons/delete";
import { DEFAULT_FILTER } from "@static/user";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const FILTERS_BLACKLIST = [...Object.keys(DEFAULT_FILTER), "lang", "userGroupList", "groupName"];

export default function ClearFilters() {
  const { filter } = useUserListFilter();
  const filterCount = Object.keys(filter).filter((f) => !FILTERS_BLACKLIST.includes(f)).length;
  const { t } = useTranslation();
  const message = t("filters:clear", { filterCount });
  const router = useRouter();

  const clearFilters = () => router.push("/user/list", {});

  return filterCount > 0 ? (
    <Tooltip title={message} showArrow={true}>
      <Button
        onClick={clearFilters}
        variant="plain"
        className="fade"
        size="lg"
        colorPalette="red"
        aria-label={message}
      >
        <DeleteIcon />
        {filterCount}
      </Button>
    </Tooltip>
  ) : null;
}
