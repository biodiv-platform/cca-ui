import "react-sortable-tree/style.css";

import { IconButton } from "@chakra-ui/react";
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

import { Tooltip } from "@/components/ui/tooltip";

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
        <Tooltip content={t("template:indicator_icons.text")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Text Field" variant="ghost">
            <TextIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.HEADING && (
        <Tooltip content={t("template:indicator_icons.heading")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Heading Field" variant="ghost">
            <HeadingIcon />
          </IconButton>
        </Tooltip>
      ),

      (row.node.type == FORM_TYPE.SINGLE_SELECT_RADIO ||
        row.node.type == FORM_TYPE.SINGLE_SELECT_DROPDOWN) && (
        <Tooltip content={t("template:indicator_icons.single_select")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Single Select Field"
            variant="ghost"
          >
            <RadiobuttonIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.MULTI_SELECT_CHECKBOX && (
        <Tooltip content={t("template:indicator_icons.multi_select")}>
          <IconButton
            colorScheme="black"
            minW="auto"
            aria-label="Multiple Select Field"
            variant="ghost"
          >
            <MultiselectIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.NUMBER && (
        <Tooltip content={t("template:indicator_icons.number")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Number Field" variant="ghost">
            <NumberIcon />
          </IconButton>
        </Tooltip>
      ),

      (row.node.type == FORM_TYPE.DATE || row.node.type == FORM_TYPE.YEAR) && (
        <Tooltip content={t("template:indicator_icons.date")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Date Field" variant="ghost">
            <CalendarIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.FILE && (
        <Tooltip content={t("template:indicator_icons.file")}>
          <IconButton colorScheme="black" minW="auto" aria-label="File Field" variant="ghost">
            <FileIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.type == FORM_TYPE.GEOMETRY && (
        <Tooltip content={t("template:indicator_icons.geometry")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Geometry Field" variant="ghost">
            <LocatinIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.isSummaryField && (
        <Tooltip content={t("template:indicator_icons.summary")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Summary Field" variant="ghost">
            <SummaryIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.isTitleColumn && (
        <Tooltip content={t("template:indicator_icons.title")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Title Field" variant="ghost">
            <TitleIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.isFilterable && (
        <Tooltip content={t("template:indicator_icons.filterable")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Filterable Field" variant="ghost">
            <FilterIcon />
          </IconButton>
        </Tooltip>
      ),

      row.node.isRequired && (
        <Tooltip content={t("template:indicator_icons.required")}>
          <IconButton colorScheme="black" minW="auto" aria-label="Required Field" variant="ghost">
            <RequiredIcon />
          </IconButton>
        </Tooltip>
      ),

      <Tooltip content={t("template:action_icons.edit")}>
        <IconButton
          marginLeft={95}
          colorScheme="green"
          minW="auto"
          aria-label="Edit Field"
          variant="ghost"
          onClick={() => setCurrentField(row.node)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>,

      <Tooltip content={t("template:action_icons.delete")}>
        <IconButton
          colorScheme="red"
          minW="auto"
          aria-label="Delete Field"
          variant="ghost"
          onClick={() => removeFieldById(row.node.fieldId)}
        >
          <DeleteIcon />
        </IconButton>
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
