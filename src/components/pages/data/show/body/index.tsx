import { Box, Center, Grid, Heading, Separator, Stack } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import useGlobalState from "@hooks/use-global-state";
import { axAddAcitivityComment } from "@services/cca.service";
import { axMemberGroupListByUserId } from "@services/usergroup.service";
import { RESOURCE_TYPE } from "@static/constants";
import React, { useEffect, useState } from "react";

import GBIFObservations from "../gbif-observations";
import Group from "../groups";
import IUCNAggregation from "../iucn-aggregation";
import SpeciesGroupAggregation from "../species-group-aggregation";
import useTemplateResponseShow from "../use-template-response-show";
import ShowSection from "./section";

export default function ShowBody() {
  const { templateGroups, header, groups, response } = useTemplateResponseShow();

  const usergroupsAsIntegers = (response?.usergroups ?? []).map(Number);

  const { user } = useGlobalState();

  const [memberGroups, setMemberGroups] = useState<[]>();
  const [loading, setLoading] = useState(true);
  const [selectedSpeciesGroup, setSelectedSpeciesGroup] = useState<string | null>(null);
  const [selectedIucnCategory, setSelectedIucnCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (user.id) {
        const { success, data } = await axMemberGroupListByUserId(user.id);
        if (success) {
          setMemberGroups(data);
        }
      } else {
        setMemberGroups([]);
      }
      setLoading(false);
    };
    fetchMemberData();
  }, [user.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSpeciesGroupSelect = (speciesGroup: string | null) => {
    setSelectedSpeciesGroup(speciesGroup);
  };

  const handleIucnCategorySelect = (category: string | null) => {
    setSelectedIucnCategory(category);
  };

  const renderDivider = () => (
    <Center className="no-print">
      <Separator mb={10} borderColor="gray.400" variant="dashed" />
    </Center>
  );

  return (
    <Container py={16}>
      {templateGroups.map((tg, index) => (
        <div key={index}>
          <ShowSection {...tg} />
          {renderDivider()}
        </div>
      ))}
      <Heading fontSize="3xl" textAlign="center" mb={8}>
        Biodiversity in India
      </Heading>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={6}>
        <Stack gap={6}>
          <SpeciesGroupAggregation
            ccaId={header.id}
            onSelectSpeciesGroup={handleSpeciesGroupSelect}
            selectedSpeciesGroup={selectedSpeciesGroup}
          />
          <IUCNAggregation
            ccaId={header.id}
            onSelectIucnCategory={handleIucnCategorySelect}
            selectedIucnCategory={selectedIucnCategory}
          />
        </Stack>
        <GBIFObservations
          ccaId={header.id}
          selectedSpeciesGroup={selectedSpeciesGroup}
          selectedIucnCategory={selectedIucnCategory}
        />
      </Grid>
      {renderDivider()}
      {user.id && (
        <>
          <Group
            ccaId={header.id}
            groups={groups}
            memberGroups={memberGroups}
            defaultGroups={usergroupsAsIntegers || []}
          />
          {renderDivider()}
        </>
      )}
      <Activity
        resourceId={header.id}
        resourceType={RESOURCE_TYPE.CCA_DATA}
        commentFunc={axAddAcitivityComment}
      />
    </Container>
  );
}
