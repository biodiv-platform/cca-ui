import { Container } from "@components/@core/container";
import React from "react";

import ResponseList from "./list";
import { TemplateResponseProvider } from "./use-template-response";

export default function TemplateResponseTableComponent({ template }) {
  return (
    <Container>
      <TemplateResponseProvider shortName={template.shortName} fields={template.fields}>
        <ResponseList />
      </TemplateResponseProvider>
    </Container>
  );
}
