import "react-sortable-tree/style.css";

import { IconButton, Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import CalendarIcon from "@icons/calendar";
import DeleteIcon from "@icons/delete";
import EditIcon from "@icons/edit";
import FileIcon from "@icons/file";
import FilterIcon from "@icons/filter";
import HeadingIcon from "@icons/heading";
import LocatinIcon from "@icons/location";
import MultiselectIcon from "@icons/multiselect";
import NumberIcon from "@icons/number";
import RadiobuttonIcon from "@icons/radiobutton";
import RequiredIcon from "@icons/required";
import SummaryIcon from "@icons/summary";
import TextIcon from "@icons/text";
import TitleIcon from "@icons/title";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import SortableTree from "react-sortable-tree";

import useTemplate from "./use-template";

export const PageListContainer = styled.div`
  .rst__rowWrapper {
    .rst__moveHandle {
      background-color: var(--chakra-colors-gray-900);
      border: none;
      box-shadow: none;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
    .rst__rowContents {
      box-shadow: none;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
    .rst__toolbarButton {
      padding: 0 0.8rem 0 0;
      font-size: 1.3em;
      line-height: 1rem;
    }
  }
`;

export default function FieldTree() {
  const { template, setFields, setCurrentField, removeFieldById, areFieldsReadOnly } =
    useTemplate();

  const { t } = useTranslation();

  const generateNodeProps = (row) => ({
    title: row.node.name,
    buttons: [
      (row.node.type == FORM_TYPE.TEXT ||
        row.node.type == FORM_TYPE.TEXT_AREA ||
        row.node.type == FORM_TYPE.RICHTEXT) && (
        <Tooltip label={t("template:indicator_icons.text")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Text Field"
            variant="link"
            icon={<TextIcon />}
          />
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.HEADING && (
        <Tooltip label={t("template:indicator_icons.heading")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Heading Field"
            variant="link"
            icon={<HeadingIcon />}
            size="lg"
          />
        </Tooltip>
      ),

      (row.node.type == FORM_TYPE.SINGLE_SELECT_RADIO ||
        row.node.type == FORM_TYPE.SINGLE_SELECT_DROPDOWN) && (
        <Tooltip label={t("template:indicator_icons.single_select")}>
          <IconButton
            minW="auto"
            aria-label="Single Select Field"
            variant="link"
            icon={<RadiobuttonIcon />}
            size="lg"
          />
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.MULTI_SELECT_CHECKBOX && (
        <Tooltip label={t("template:indicator_icons.multi_select")}>
          <IconButton
            colorScheme="black"
            size="xl"
            minW="auto"
            aria-label="Multiple select Field"
            variant="link"
            icon={<MultiselectIcon />}
          />
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.NUMBER && (
        <Tooltip label={t("template:indicator_icons.number")}>
          <IconButton
            colorScheme="black"
            size="xl"
            minW="auto"
            aria-label="Number Field"
            variant="link"
            icon={<NumberIcon />}
          />
        </Tooltip>
      ),

      (row.node.type == FORM_TYPE.DATE || row.node.type == FORM_TYPE.YEAR) && (
        <Tooltip label={t("template:indicator_icons.date")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Date Field"
            variant="link"
            icon={<CalendarIcon />}
          />
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.FILE && (
        <Tooltip label={t("template:indicator_icons.file")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="File Field"
            variant="link"
            icon={<FileIcon />}
          />
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.GEOMETRY && (
        <Tooltip label={t("template:indicator_icons.geometry")}>
          <IconButton
            colorScheme="black"
            size="xl"
            minW="auto"
            aria-label="Geometry Field"
            variant="link"
            icon={<LocatinIcon />}
          />
        </Tooltip>
      ),

      row.node.isSummaryField && (
        <Tooltip label={t("template:indicator_icons.summary")}>
          <IconButton
            colorScheme="black"
            size="xl"
            minW="auto"
            aria-label="Summary Field"
            variant="link"
            icon={<SummaryIcon />}
          />
        </Tooltip>
      ),

      row.node.isTitleColumn && (
        <Tooltip label={t("template:indicator_icons.title")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Title Field"
            variant="link"
            icon={<TitleIcon />}
          />
        </Tooltip>
      ),

      row.node.isFilterable && (
        <Tooltip label={t("template:indicator_icons.filterable")}>
          <IconButton
            colorScheme="black"
            size="xl"
            minW="auto"
            aria-label="Filterable Field"
            variant="link"
            icon={<FilterIcon />}
          />
        </Tooltip>
      ),

      row.node.isRequired && (
        <Tooltip label={t("template:indicator_icons.required")}>
          <IconButton
            colorScheme="black"
            size="lg"
            minW="auto"
            aria-label="Required Field"
            variant="link"
            icon={<RequiredIcon />}
          />
        </Tooltip>
      ),

      <Tooltip label={t("template:action_icons.edit")}>
        <IconButton
          marginLeft={95}
          colorScheme="green"
          minW="auto"
          aria-label="Edit Field"
          variant="link"
          onClick={() => setCurrentField(row.node)}
          icon={<EditIcon />}
        />
      </Tooltip>,

      <Tooltip label={t("template:action_icons.delete")}>
        <IconButton
          colorScheme="red"
          minW="auto"
          aria-label="Delete Field"
          variant="link"
          onClick={() => removeFieldById(row.node.fieldId)}
          icon={<DeleteIcon />}
        />
      </Tooltip>
    ].filter(Boolean)
  });

  return (
    <PageListContainer>
      <SortableTree
        treeData={template.fields}
        onChange={setFields}
        canDrag={() => !areFieldsReadOnly}
        canDrop={() => !areFieldsReadOnly}
        maxDepth={5}
        isVirtualized={false}
        getNodeKey={({ node }) => node.fieldId}
        generateNodeProps={generateNodeProps}
      />
    </PageListContainer>
  );
}
