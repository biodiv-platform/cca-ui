import { Container, SimpleGrid, Table } from "@chakra-ui/react";
import { axGetCCAData } from "@services/cca.service";
import { formatDate } from "@utils/date";
import { getInjectableHTML } from "@utils/text";
import React, { useEffect, useMemo, useState } from "react";

import { Prose } from "@/components/ui/prose";

export default function ExpandedComponent(props) {
  const ccaId = props.data.id;
  const [data, setData] = useState({});

  const ccaData = async () => {
    const { success, data } = await axGetCCAData(ccaId);
    if (success) {
      setData(data);
    }
  };

  useEffect(() => {
    ccaData();
  }, []);

  const EXPAND_BLACKLIST = ["id", "ccaFieldValues"];

  const infoRows = useMemo(
    () => Object.entries(data).filter((r) => r[1] && !EXPAND_BLACKLIST.includes(r[0])),
    [data]
  );

  const findCCAFieldValuesByKey = (object, keyToFind) => {
    return (
      Object.entries(object).reduce(
        (acc, [key, value]) =>
          key === keyToFind
            ? acc.concat(object)
            : typeof value === "object" && value
            ? acc.concat(findCCAFieldValuesByKey(value, keyToFind))
            : acc,
        []
      ) || []
    );
  };

  const buildObject = (ccaFieldValues) => {
    const ccaFieldValue = {};
    ccaFieldValues.forEach((element) => {
      if (
        element.type == "MULTI_SELECT_CHECKBOX" ||
        element.type == "SINGLE_SELECT_DROPDOWN" ||
        element.type == "FILE" ||
        element.type == "SINGLE_SELECT_RADIO" ||
        element.type == "GEOMETRY"
      ) {
        if (element.value[0]) {
          const { label, value } = element.value[0];
          ccaFieldValue[label] = value;
        }
        if (element.value.label) {
          const { name } = element.name;
          const { label } = element.value.label;
          ccaFieldValue[name] = label;
        }
      } else {
        const { name, value } = element;
        ccaFieldValue[name] = value;
      }
    });
    return ccaFieldValue;
  };

  const ccaFieldValues = buildObject(findCCAFieldValuesByKey(data, "value"));

  const ccaFiledValue = useMemo(
    () => Object.entries(ccaFieldValues).filter((r) => r[1] && !EXPAND_BLACKLIST.includes(r[0])),
    [data]
  );

  const renderSwitch = (key, value) => {
    switch (key) {
      case "createdOn":
      case "updatedOn":
      case "Year of Formation":
        return (
          <div
            dangerouslySetInnerHTML={{ __html: getInjectableHTML(formatDate(value).toString()) }}
          ></div>
        );
      default:
        return (
          <div dangerouslySetInnerHTML={{ __html: getInjectableHTML(value.toString()) }}></div>
        );
    }
  };

  return (
    <div>
      <SimpleGrid columns={1} gap={0} borderBottomWidth="1px">
        <Container>
          <Table.Root>
            <Table.Body>
              {infoRows.map(([k, v]: any) => (
                <Table.Row key={k}>
                  <Table.ColumnHeader>{k}</Table.ColumnHeader>
                  <Table.ColumnHeader whiteSpace="initial" wordBreak="break-word">
                    <Prose>{renderSwitch(k, v)}</Prose>
                  </Table.ColumnHeader>
                </Table.Row>
              ))}
              {ccaFiledValue.map(([k, v]: any) => (
                <Table.Row key={k}>
                  <Table.Cell>{k}</Table.Cell>
                  <Table.Cell whiteSpace="initial" wordBreak="break-word">
                    <Prose>{renderSwitch(k, v)}</Prose>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
      </SimpleGrid>
    </div>
  );
}
