import { SimpleGrid, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { axGetCCAData } from "@services/cca.service";
import { getInjectableHTML } from "@utils/text";
import React, { useEffect, useMemo, useState } from "react";



export default function ExpandedComponent(props) {

  const ccaId = props.data.id

  const [data, setData] = useState([]);

  const ccaData = async () => {
    const { success, data } = await axGetCCAData(ccaId);
    if (success) {
      setData(data);
    }
  };

  useEffect(() => {
    ccaData()
  }, []);

  const EXPAND_BLACKLIST = [
    "id"
  ];

  const infoRows = useMemo(
    () => Object.entries(data).filter((r) => r[1] && !EXPAND_BLACKLIST.includes(r[0])),
    [data]
  );

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
                    {/* <Prose> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: getInjectableHTML(v?.toString()) }}
                    ></div>
                    {v.toString()}
                    {/* </Prose> */}
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
