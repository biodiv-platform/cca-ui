import { Box, Center, Container, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {fetchGroupDetails} from "../../../services/usergroup.service"

type Group = {
  id: number;
  name: string;
  icon: string;
  description: string;
  webAddress: string;
  isParticipatory: boolean;
};

function GroupDetailPage() {
  const router = useRouter();
  const groupId = router.query.groupId;
  const [groupDetails, setGroupDetails] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch group details when the component mounts
    if (groupId) {
      fetchGroupDetails(groupId)
        .then((response) => {
          if (response.success) {
            setGroupDetails(response.data);
          } else {
            console.error("Error fetching group details.");
          }
          setLoading(false); // Set loading to false when data is loaded or error occurs
        })
        .catch((error) => {
          console.error("Error fetching group details:", error);
          setLoading(false); // Set loading to false on error
        });
    }
  }, [groupId]);

  return (
    <Container maxW="xl">
      <Box mt={8}>
        {loading ? (
          <Center mt={8}>
            <Spinner size="lg" color="teal.500" />
          </Center>
        ) : groupDetails ? (
          <VStack mt={4} spacing={4}>
            <Image
              src={`https://staging.communityconservedareas.org/files-api/api/get/crop/userGroups/${groupDetails.icon}?w=500`}
              alt={`Icon for ${groupDetails.name}`}
              maxW="300px"
            />
            <Heading as="h2" size="lg">
              {groupDetails.name}
            </Heading>
            <Text>{groupDetails.description}</Text>
          </VStack>
        ) : (
          <Text mt={4}>Error loading group details.</Text>
        )}
      </Box>
    </Container>
  );
}

export default GroupDetailPage;
