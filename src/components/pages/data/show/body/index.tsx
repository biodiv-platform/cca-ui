import { Center, Divider } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import useGlobalState from "@hooks/use-global-state";
import { axAddAcitivityComment } from "@services/cca.service";
import { axMemberGroupListByUserId } from "@services/usergroup.service";
import { RESOURCE_TYPE } from "@static/constants";
import React, { useEffect, useState } from "react";

import Group from "../groups";
import useTemplateResponseShow from "../use-template-response-show";
import ShowSection from "./section";

export default function ShowBody() {
  const { templateGroups, header, groups, response } = useTemplateResponseShow();

  const usergroupsAsIntegers = (response?.usergroups ?? []).map(Number);

  const { user } = useGlobalState();

  const [memberGroups, setMemberGroups] = useState<[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axMemberGroupListByUserId(user.id).then((response) => {
      if (response.success) {
        setMemberGroups(response.data);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Container py={16}>
      {templateGroups.map((tg, index) => (
        <div key={index}>
          <ShowSection {...tg} />
          <Center className="no-print">
            <Divider mb={10} borderColor="gray.400" variant="dashed" />
          </Center>
        </div>
      ))}
      <Group
        ccaId={header.id}
        groups={groups}
        memberGroups={memberGroups}
        defaultGroups={usergroupsAsIntegers || []}
      />
      <Center className="no-print">
        <Divider mb={10} borderColor="gray.400" variant="dashed" />
      </Center>

      <Activity
        resourceId={header.id}
        resourceType={RESOURCE_TYPE.CCA_DATA}
        commentFunc={axAddAcitivityComment}
      />
    </Container>
  );
}
