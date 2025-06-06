import { Button } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { axCheckUserGroupFounderOrAdmin } from "@services/usergroup.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function CreatePagesButton({ label }) {
  const {
    currentGroup: { webAddress, id }
  } = useGlobalState();
  const { pathname } = useRouter();

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (id) {
      axCheckUserGroupFounderOrAdmin(id).then((data) => {
        setCanEdit(data && !pathname.endsWith("edit"));
      });
    }
  }, [pathname]);

  return canEdit ? (
    <LocalLink prefixGroup={true} href={`${webAddress}/page/create`}>
      <Button className="join-usergroup" m={2} colorPalette="green" size="sm">
        <LuPlus />
        {label}
      </Button>
    </LocalLink>
  ) : null;
}
