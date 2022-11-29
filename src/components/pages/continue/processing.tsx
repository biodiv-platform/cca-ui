import { Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";

interface ProcessingProps {
  loading: boolean;
  success: boolean;
  redirect?: boolean;
}

export default function Processing({ success, loading }: ProcessingProps) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/data/list");
    }
  }, [success]);

  return loading ? (
    <Alert m={6} borderRadius="md">
      <AlertIcon />
      {t("processing")}
    </Alert>
  ) : (
    <Alert m={6} borderRadius="md" status={success ? "success" : "error"}>
      <AlertIcon />
      {success ? "Added Contributor Successfully" : "Failed to add Contributor"}
    </Alert>
  );
}
