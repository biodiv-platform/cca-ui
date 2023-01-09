import { SimpleGrid, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { axGetCCAData } from "@services/cca.service";
import { formatDate } from "@utils/date";
import { getInjectableHTML } from "@utils/text";
import React, { useEffect, useMemo, useState } from "react";

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

  function findCCAFieldValuesByKey(obj, keyToFind) {
    return (
      Object.entries(obj).reduce(
        (acc, [key, value]) =>
          key === keyToFind
            ? acc.concat(obj)
            : typeof value === "object" && value
              ? acc.concat(findCCAFieldValuesByKey(value, keyToFind))
              : acc,
        []
      ) || []
    );
  }

  const buildObject = (arr) => {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].type == "MULTI_SELECT_CHECKBOX" ||
        arr[i].type == "SINGLE_SELECT_DROPDOWN" ||
        arr[i].type == "FILE" ||
        arr[i].type == "SINGLE_SELECT_RADIO" ||
        arr[i].type == "GEOMETRY"
      ) {
        if (typeof arr[i].value[0] != "undefined") {
          const { label, value } = arr[i].value[0];
          obj[label] = value;
        }
        if (typeof arr[i].value.label != "undefined") {
          const { name } = arr[i].name;
          const { label } = arr[i].value.label;
          obj[name] = label;
        }
      } else {
        const { name, value } = arr[i];
        obj[name] = value;
      }
    }
    return obj;
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
      <SimpleGrid columns={1} spacing={0} borderBottomWidth="1px">
        <TableContainer>
          <Table variant="striped">
            <Tbody>
              {infoRows.map(([k, v]: any) => (
                <Tr key={k}>
                  <Td>{k}</Td>
                  <Td whiteSpace="initial" wordBreak="break-word">
                    <Prose>{renderSwitch(k, v)}</Prose>
                  </Td>
                </Tr>
              ))}
              {ccaFiledValue.map(([k, v]: any) => (
                <Tr key={k}>
                  <Td>{k}</Td>
                  <Td whiteSpace="initial" wordBreak="break-word">
                    <Prose>{renderSwitch(k, v)}</Prose>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </div>
  );
}
