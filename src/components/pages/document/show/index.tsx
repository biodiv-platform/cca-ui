import { Box, SimpleGrid } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import SITE_CONFIG from "@configs/site-config";
import styled from "@emotion/styled";
import useGlobalState from "@hooks/use-global-state";
import { DocumentUserPermission, ShowDocument } from "@interfaces/document";
import { axAddDocumentComment } from "@services/activity.service";
import {
  axDocumentGroupsFeature,
  axDocumentGroupsUnFeature,
  axDocumentSaveUserGroups,
  axGetDocumentPermissions
} from "@services/document.service";
import { RESOURCE_TYPE } from "@static/constants";
import { getDocumentURL } from "@utils/document";
import { getDocumentFilePath, getDocumentPath } from "@utils/media";
import React, { useEffect, useState } from "react";

import Groups from "./groups";
import DocumentHeader from "./header";
import DocumentInfo from "./info";
import Sidebar from "./sidebar";

const DocumentIframe = styled.iframe`
  background: #3b3b3b;
  border-radius: 0.25rem;
  width: 100%;
  height: 522px;
  grid-column: 1/3;
  margin-bottom: 1rem;
`;

interface DocumentShowProps {
  document: ShowDocument;
  speciesGroups;
  habitatList;
  showViewer;
}

export default function DocumentShowComponent({ document }: DocumentShowProps) {
  const { isLoggedIn } = useGlobalState();
  const [permission, setPermission] = useState<DocumentUserPermission>();
  const documentPath = getDocumentURL(document);

  useEffect(() => {
    if (isLoggedIn) {
      axGetDocumentPermissions(document?.document?.id).then(
        ({ success, data }) => success && setPermission(data)
      );
    }
  }, [isLoggedIn]);

  const getDocumentType = (mimeType) => {
    if (mimeType?.includes("video")) {
      return "video";
    }
    if (mimeType?.includes("pdf")) {
      return "pdf";
    }
    return undefined;
  };

  const renderDocument = (fileExtension: string | undefined) => {
    switch (fileExtension) {
      case "video":
        return (
          <Box>
            <video width="100%" controls>
              <source src={getDocumentFilePath(documentPath)} />
            </video>
          </Box>
        );
      default:
        return <DocumentIframe className="fadeInUp delay-2" src={getDocumentPath(documentPath)} />;
    }
  };

  return (
    <div className="container mt">
      <DocumentHeader document={document} />
      <SimpleGrid columns={[1, 1, 3, 3]} spacing={[1, 1, 4, 4]}>
        <Box gridColumn="1/3">
          {renderDocument(getDocumentType(document?.uFile?.mimeType))}

          <DocumentInfo d={document} />

          {SITE_CONFIG.USERGROUP.ACTIVE && (
            <Groups
              resourceId={document?.document?.id}
              observationGroups={document?.userGroupIbp}
              featured={document?.featured}
              permission={permission}
              resourceType={RESOURCE_TYPE.DOCUMENT}
              saveUserGroupsFunc={axDocumentSaveUserGroups}
              featureFunc={axDocumentGroupsFeature}
              unfeatureFunc={axDocumentGroupsUnFeature}
            />
          )}

          <Activity
            resourceId={document?.document?.id}
            resourceType={RESOURCE_TYPE.DOCUMENT}
            commentFunc={axAddDocumentComment}
          />
        </Box>
        <Sidebar showDocument={document} documentPath={documentPath} />
      </SimpleGrid>
    </div>
  );
}
