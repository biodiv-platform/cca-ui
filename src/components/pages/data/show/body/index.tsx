import { Center, Divider } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import { axAddAcitivityComment } from "@services/cca.service";
import { RESOURCE_TYPE } from "@static/constants";
import React from "react";

import useTemplateResponseShow from "../use-template-response-show";
import ShowSection from "./section";

export default function ShowBody() {
  const { templateGroups, header } = useTemplateResponseShow();

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
      <Activity
        resourceId={header.id}
        resourceType={RESOURCE_TYPE.CCA_DATA}
        commentFunc={axAddAcitivityComment}
      />
    </Container>
  );
}
