import { ShowDocument } from "@interfaces/document";
import React from "react";

import DownloadButtons from "./download-buttons";
import User from "./user";

interface SidebarProps {
  showDocument: ShowDocument;

  documentPath?;
}

export default function Sidebar({ showDocument, documentPath }: SidebarProps) {
  return (
    <div>
      <User user={showDocument.userIbp} />
      <DownloadButtons
        documentPath={documentPath}
        title={showDocument?.document?.title}
        documentId={showDocument?.document?.id}
      />
    </div>
  );
}
