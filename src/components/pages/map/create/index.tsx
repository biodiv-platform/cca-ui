import { Box } from "@chakra-ui/react";
import { useLocalRouter } from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { ENDPOINT } from "@static/constants";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const NakshaLayerUpload: any = dynamic(
  () => import("./naksha-upload").then((mod: any) => mod.NakshaLayerUpload),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

export default function MapCreatePageComponent() {
  const { user } = useGlobalState();
  const router = useLocalRouter();
  const { lang } = useTranslation();

  const handleOnLayerUpload = (status) => {
    if (status) {
      router.push("/map", true);
    }
  };

  return (
    <Box h="calc(100vh - var(--heading-height))" overflowX="auto" position="relative" p={4}>
      <NakshaLayerUpload
        lang={lang}
        nakshaEndpoint={`${ENDPOINT.NAKSHA}/layer/upload`}
        callback={handleOnLayerUpload}
        bearerToken={`Bearer ${user.accessToken}`}
      />
    </Box>
  );
}
