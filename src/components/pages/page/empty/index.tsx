import { Button, Center, Text } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { axCheckUserGroupFounderOrAdmin } from "@services/usergroup.service";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuMoveRight } from "react-icons/lu";

export default function EmptyPageComponent() {
  const { currentGroup } = useGlobalState();

  const { t } = useTranslation();

  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    axCheckUserGroupFounderOrAdmin(currentGroup.id, true).then(setCanCreate);
  }, []);

  return (
    <Container>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="xl" mb={4}>
            {t("page:empty")}
          </Text>
          {canCreate && (
            <LocalLink prefixGroup={true} href="/page/create">
              <Button as="a" colorPalette="blue">
                {t("page:create.title")}
                <LuMoveRight />
              </Button>
            </LocalLink>
          )}
        </div>
      </Center>
    </Container>
  );
}
