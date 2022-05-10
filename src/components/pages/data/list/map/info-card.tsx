import { Box } from "@chakra-ui/react";
import { InfoBox } from "@react-google-maps/api";
import { axGetDataSummaryById } from "@services/cca.service";
import React, { useEffect, useState } from "react";

import { Card } from "../cards";

export default function InfoCard({ data }) {
  const [summaryData, setSummaryData] = useState();

  const getResponseData = async () => {
    const _summaryData = await axGetDataSummaryById(data.id);
    if (_summaryData.success) {
      setSummaryData(_summaryData.data);
    }
  };

  useEffect(() => {
    getResponseData();
  }, [data]);

  return summaryData ? (
    <InfoBox position={data} options={{ maxWidth: 340 }}>
      <Box bg="white" borderRadius="xl" boxShadow="lg">
        <Card response={summaryData} onHover={() => null} isTruncated={true} />
      </Box>
    </InfoBox>
  ) : null;
}
