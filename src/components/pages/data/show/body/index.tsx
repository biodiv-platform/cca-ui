import { Box, Center, Grid, GridItem, Heading, Separator, Stack } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import useGlobalState from "@hooks/use-global-state";
import { axAddAcitivityComment } from "@services/cca.service";
import { axMemberGroupListByUserId } from "@services/usergroup.service";
import { RESOURCE_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useMemo, useState } from "react";

import GBIFObservations from "../gbif-observations";
import Group from "../groups";
import IUCNAggregation from "../iucn-aggregation";
import QuickNav from "../quick-nav";
import SpeciesGroupAggregation from "../species-group-aggregation";
import useTemplateResponseShow from "../use-template-response-show";
import ShowSection from "./section";

export default function ShowBody() {
  const { templateGroups, header, groups, response } = useTemplateResponseShow();
  const { t } = useTranslation();

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

  const sections = useMemo(
    () => [
      ...templateGroups.map((tg) => ({ id: tg.heading.fieldId, label: tg.heading.name })),
      { id: "biodiversity", label: "Biodiversity" },
      ...(user.id ? [{ id: "groups", label: t("common:microsites") }] : []),
      { id: "comments", label: t("common:activity") }
    ],
    [templateGroups, user.id]
  );

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
    <>
      <QuickNav sections={sections} />
      <Container py={16}>
        {templateGroups.map((tg, index) => (
          <div key={index}>
            <ShowSection {...tg} />
            {renderDivider()}
          </div>
        ))}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
          columnGap={6}
          rowGap={{ base: 6, lg: 0 }}
        >
          <GridItem display={{ base: "none", lg: "block" }} />
          <Heading
            id="biodiversity"
            css={{ scrollMarginTop: "7rem" }}
            fontSize="3xl"
            textAlign="left"
            mb={8}
          >
            Biodiversity
          </Heading>
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
          <Box id="groups" css={{ scrollMarginTop: "7rem" }}>
            <Group
              ccaId={header.id}
              groups={groups}
              memberGroups={memberGroups}
              defaultGroups={usergroupsAsIntegers || []}
            />
            {renderDivider()}
          </Box>
        )}
        <Box id="comments" css={{ scrollMarginTop: "7rem" }}>
          <Activity
            resourceId={header.id}
            resourceType={RESOURCE_TYPE.CCA_DATA}
            commentFunc={axAddAcitivityComment}
          />
        </Box>
      </Container>
    </>
  );
}
