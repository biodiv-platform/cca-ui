import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Center, Text } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import { Role } from "@interfaces/custom";
import { hasAccess } from "@utils/auth";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

export default function EmptyPageComponent() {
  const { t } = useTranslation();

  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    setCanCreate(hasAccess([Role.Admin]));
  }, []);

  return (
    <Container>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="xl" mb={4}>
            {t("page:empty")}
          </Text>
          {canCreate && (
            <NextLink href="/page/create">
              <Button as="a" colorScheme="blue" rightIcon={<ArrowForwardIcon />}>
                {t("page:create.title")}
              </Button>
            </NextLink>
          )}
        </div>
      </Center>
    </Container>
  );
}
