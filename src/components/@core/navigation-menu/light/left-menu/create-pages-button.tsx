import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { axCheckUserGroupFounderOrAdmin } from "@services/usergroup.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
      <Button className="join-usergroup" leftIcon={<AddIcon />} m={2} colorScheme="green" size="sm">
        {label}
      </Button>
    </LocalLink>
  ) : null;
}
