import styled from "@emotion/styled";
import useGlobalState from "@hooks/use-global-state";
import { convertToMenuFormat } from "@utils/pages";
import { processUserGroupName } from "@utils/userGroup";
import { Mq } from "mq-styled-components";
import React from "react";

import MainItems from "../../common/menu-items";
import items from "./items";

interface IMenuProps {
  isOpen;
}

const RightMenuContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 3;
  & > a,
  & > button {
    margin-left: 1.3rem;
    white-space: pre;
  }

  ${Mq.max.sm} {
    width: 100%;
    flex-direction: column;
    height: auto;
    & > a,
    & > button {
      width: 100%;
      margin-left: 0;
      margin-bottom: 1rem;
      text-align: left;
    }
    &[data-expanded="false"] {
      height: 0px;
      overflow: hidden;
    }
  }

  [role="menu"] {
    color: initial;
  }
`;

export default function RightMenu({ isOpen }: IMenuProps) {
  const { pages, currentGroup } = useGlobalState();

  const groupPage = `/group/${processUserGroupName(currentGroup.name)}/page/`;

  const isGroup = currentGroup.id ? true : false;

  const outputMenuFormat = currentGroup.id
    ? convertToMenuFormat(pages, groupPage, false, true, false)
    : convertToMenuFormat(pages, "/page/", false, true, false);

  const activeItems = items.filter(({ active }) => active === true);
  const darkItems = items.filter(({ isDarkButton }) => isDarkButton === true);

  return (
    <RightMenuContainer data-expanded={isOpen} className="fade">
      {darkItems.map((item) => (
        <MainItems key={item.name} {...item} prefixGroup={isGroup} />
      ))}
      {outputMenuFormat.map((item) => (
        <MainItems key={item.name} {...item} prefixGroup={false} />
      ))}
      {activeItems.map((item) => (
        <MainItems key={item.name} {...item} prefixGroup={isGroup} />
      ))}
    </RightMenuContainer>
  );
}
