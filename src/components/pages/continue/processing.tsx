import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";

import { Alert } from "@/components/ui/alert";

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
      {t("processing")}
    </Alert>
  ) : (
    <Alert m={6} borderRadius="md" status={success ? "success" : "error"}>
      {success ? "Added Contributor Successfully" : "Failed to add Contributor"}
    </Alert>
  );
}
