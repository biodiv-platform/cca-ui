import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ResponsiveContainer } from "@components/@core/basic-table";
import BlueLink from "@components/@core/blue-link";
import NextLink from "@components/@core/next-link";
import { axGetUserParticipations } from "@services/cca.service";
import { timeAgoUTC } from "@utils/date";
import { findTitleFromHeader } from "@utils/field";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const userParticipationColumns = [
  {
    name: "Name",
    selector: (row) => findTitleFromHeader(row)
  },
  {
    name: "Template",
    selector: (row) => row.shortName
  },
  {
    name: "Created On",
    selector: (row) => timeAgoUTC(row.createdOn)
  },
  {
    name: "Updated On",
    selector: (row) => timeAgoUTC(row.updatedOn)
  },
  {
    name: "Action",
    selector: (row) => row.id,
    cell: ({ id }) => (
      <NextLink href={`/data/show/${id}`}>
        <BlueLink>
          View <ArrowForwardIcon />
        </BlueLink>
      </NextLink>
    )
  }
];

export default function UserParticipations() {
  const [particiapations, setParticipations] = useState<any>();

  useEffect(() => {
    axGetUserParticipations().then(
      ({ success, data }) => success && setParticipations(data.reverse())
    );
  }, []);

  return (
    <ResponsiveContainer>
      <DataTable columns={userParticipationColumns} data={particiapations} pagination={true} />
    </ResponsiveContainer>
  );
}
