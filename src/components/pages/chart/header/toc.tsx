import { Button, Popover, Portal } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MenuIcon from "@icons/menu";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const ToCContainer = styled.div`
  ul {
    margin-left: 1rem;
    list-style-type: none;
  }
  & > ul {
    margin: 0.2rem 0;
  }
  a {
    display: block;
    padding: 0.5rem 0.65rem;
    border-radius: 0.25rem;
    line-height: 1.2rem;
    min-height: 2.2rem;
    &:hover {
      background: var(--chakra-colors-gray-100);
    }
  }
`;

export function TableOfContents({ quickNavLinks }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: "bottom-start" }}
    >
      <Popover.Trigger asChild>
        <Button variant="outline" size="md" colorPalette="gray" bg="gray.200" fontWeight={"bold"}>
          <MenuIcon />
          {t("chart:quick_navigation")}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body maxH="20rem" overflow="auto" onClick={() => setOpen(false)}>
              <ToCContainer className="toc">
                <ul>
                  {quickNavLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.Title}</a>
                    </li>
                  ))}
                </ul>
              </ToCContainer>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
