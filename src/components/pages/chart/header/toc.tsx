import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MenuIcon from "@icons/menu";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from "@/components/ui/popover";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverRoot
      open={isOpen}
      onOpenChange={() => setIsOpen(true)}
      positioning={{ placement: "bottom-start" }}
    >
      <PopoverTrigger>
        <Button variant="outline" size="md" colorPalette="gray" bg="gray.200" fontWeight={"bold"}>
          <MenuIcon />
          {t("chart:quick_navigation")}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody maxH="20rem" overflow="auto" onClick={() => setIsOpen(false)}>
          <ToCContainer className="toc">
            <ul>
              {quickNavLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.Title}</a>
                </li>
              ))}
            </ul>
          </ToCContainer>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
