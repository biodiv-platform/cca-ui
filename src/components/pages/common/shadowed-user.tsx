import {  Flex, Link } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import styled from "@emotion/styled";
import { UserIbp } from "@interfaces/activity";
import { getUserImage } from "@utils/media";
import React from "react";

import { Avatar } from "@/components/ui/avatar";

const UserBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 1rem;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`;

export default function ShadowedUser({
  user = {},
  avatar = true
}: {
  user?: UserIbp;
  avatar?: boolean;
}) {
  return (
    <UserBox>
      <LocalLink href={`/user/show/${user?.id}`} prefixGroup={true}>
        <Link color="white">
          <Flex alignItems="center">
            {avatar && (
              <Avatar
                mr={2}
                flexShrink={0}
                size="sm"
                name={user?.name}
                src={getUserImage(user?.profilePic, user?.name)}
              />
            )}
            <div className="elipsis-2">{user?.name}</div>
          </Flex>
        </Link>
      </LocalLink>
    </UserBox>
  );
}
