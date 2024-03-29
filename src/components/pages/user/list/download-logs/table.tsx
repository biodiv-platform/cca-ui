import { BasicTable, ResponsiveContainer } from "@components/@core/basic-table";
import Loading from "@components/pages/common/loading";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useDownloadLogsList from "../../common/use-download-log";
import { downloadLogsRow } from "./metadata";

export default function DownloadLogsTable() {
  const { t } = useTranslation();
  const {
    downloadLogData: { l: logs, hasMore },
    filter,
    nextPage
  } = useDownloadLogsList();

  const [fieldData, setFieldData] = useState<any[]>(logs);
  const [tableMeta, setTableMeta] = useState(
    downloadLogsRow(logs, `${t("user:download")}`, `${t("user:file_not_found")}`)
  );

  useEffect(() => {
    if (logs?.length) {
      setFieldData(logs);
      setTableMeta(downloadLogsRow(logs, `${t("user:download")}`, `${t("common:unknown")}`));
    }
  }, [logs, filter]);

  return (
    <>
      {logs?.length ? (
        <InfiniteScroll
          dataLength={logs.length}
          next={nextPage}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
        >
          <ResponsiveContainer>
            {fieldData && (
              <BasicTable translateHeader data={fieldData || []} columns={tableMeta || []} />
            )}
          </ResponsiveContainer>
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </>
  );
}
