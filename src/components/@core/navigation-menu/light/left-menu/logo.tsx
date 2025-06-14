import { Box, IconButton, Link } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import styled from "@emotion/styled";
import useGlobalState from "@hooks/use-global-state";
import CrossIcon from "@icons/cross";
import MenuIcon from "@icons/menu";
import { Mq } from "mq-styled-components";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const EditLinkButton = dynamic(() => import("./edit-link-button"), { ssr: false });
const JoinUserGroup = dynamic(() => import("@components/pages/group/common/join-group"), {
  ssr: false
});

const CreatePagesButton = dynamic(() => import("./create-pages-button"), {
  ssr: false
});

const Logo = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0;
  min-height: 3.75rem;
  flex-wrap: wrap;

  .right-logo {
    display: contents;
  }

  a {
    display: flex;
    align-items: center;
    line-height: 1.2rem;
  }

  .icon-gov,
  a img {
    height: 3.75rem;
    max-width: 8rem;
    object-fit: contain;
  }

  .menu-toggle {
    display: none;
    padding: 0.5rem;
    font-size: 1.5rem;
  }

  .icon-gov,
  .join-usergroup {
    margin-left: 0.75rem;
  }

  ${Mq.max.lg} {
    width: 100%;

    .menu-toggle {
      display: initial;
    }

    .join-usergroup {
      flex-basis: 100%;
      margin: 0.75rem 0;
      width: 100%;
    }
  }

  ${Mq.min.md + " and (max-width: 768px)"} {
    padding: 0.5rem 0;
  }
`;

export default function PrimaryLogo({ isOpen, onToggle }) {
  const { currentGroup, isCurrentGroupMember, setIsCurrentGroupMember } = useGlobalState();
  const { t } = useTranslation();
  const { name, nameLocal, icon } = currentGroup;

  return (
    <Logo>
      <Link asChild>
        <LocalLink href="/" prefixGroup={true}>
          {currentGroup.id && <img src={`${icon}?w=128&preserve=true`} alt={name} title={name} />}
          <Box ml={2} textAlign="center" maxW={{ base: "8rem", sm: "unset" }}>
            {nameLocal && <Box mb={1}>{nameLocal}</Box>}
            {name}
          </Box>
        </LocalLink>
      </Link>

      <IconButton
        className="menu-toggle"
        onClick={onToggle}
        aria-label={t("header:toggle_menu")}
        variant={"subtle"}
      >
        {isOpen ? <CrossIcon /> : <MenuIcon />}
      </IconButton>
      {currentGroup.id && (
        <>
          <JoinUserGroup
            currentGroup={currentGroup}
            isCurrentGroupMember={isCurrentGroupMember}
            setIsCurrentGroupMember={setIsCurrentGroupMember}
          />
          <CreatePagesButton label={t("header:create_pages")} />
          <EditLinkButton label={t("header:group_edit")} />
        </>
      )}
    </Logo>
  );
}
