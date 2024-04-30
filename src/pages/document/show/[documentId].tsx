import DocumentShowComponent from "@components/pages/document/show";
import { axGetDocumentById } from "@services/document.service";
import { getDocumentURL, isLinkPDF } from "@utils/document";
import React from "react";

const DocumentShowPage = (props) => <DocumentShowComponent {...props} />;

export const getServerSideProps = async (ctx) => {
  const [document] = await Promise.all([axGetDocumentById(ctx.query.documentId)]);

  const showViewer = await isLinkPDF(getDocumentURL(document.data));

  return {
    props: {
      document: document.data,
      showViewer
    }
  };
};

export default DocumentShowPage;
