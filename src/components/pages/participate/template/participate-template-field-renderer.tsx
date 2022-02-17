import { Box, Heading } from "@chakra-ui/react";
import { CheckboxListField } from "@components/form/checkbox-list";
import { DatePickerField } from "@components/form/datepicker";
import { DateRangePickerField } from "@components/form/daterangepicker";
import { FileField } from "@components/form/file";
import { GeometryField } from "@components/form/geometry";
import { NumberInputField } from "@components/form/number";
import { NumberRangeField } from "@components/form/number-range";
import { RadioInputField } from "@components/form/radio";
import { SelectInputField } from "@components/form/select";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import { YearPickerField } from "@components/form/yearpicker";
import { axUploadEditorPageResource } from "@services/pages.service";
import { FORM_TYPE } from "@static/constants";
import dynamic from "next/dynamic";
import React from "react";

const WYSIWYGField = dynamic(() => import("@components/form/wysiwyg"), { ssr: false });

export default function ParticipateTemplateFieldRenderer({ field }) {
  const defaultProps = {
    name: field.fieldId,
    title: field.name,
    label: field.question,
    helpText: field?.helpText,
    mb: 0,
    min: field?.minMax?.[0],
    max: field?.minMax?.[1],
    isRequired: field.isRequired,
    isLargeVariant: true
  };

  switch (field.type) {
    case FORM_TYPE.TEXT:
      return <TextBoxField {...defaultProps} />;

    case FORM_TYPE.TEXT_AREA:
      return <TextAreaField {...defaultProps} />;

    case FORM_TYPE.RICHTEXT:
      return <WYSIWYGField {...defaultProps} uploadHandler={axUploadEditorPageResource} />;

    case FORM_TYPE.HEADING:
      return (
        <Heading
          id={field.fieldId}
          flexGrow={1}
          mb={1}
          display="flex"
          size="md"
          fontWeight="600"
          style={{ scrollMarginTop: "var(--content-top)" }}
        >
          <Box href={`#${field.fieldId}`} color="gray.400" as="a" mr={2}>
            #
          </Box>
          {defaultProps.title}
        </Heading>
      );

    case FORM_TYPE.SINGLE_SELECT:
      return <SelectInputField {...defaultProps} options={field.valueOptions} />;

    case FORM_TYPE.RADIO:
      return (
        <RadioInputField
          {...defaultProps}
          options={field.valueOptions}
          isInline={false}
          isOthers={true}
        />
      );

    case FORM_TYPE.MULTI_SELECT:
      return <SelectMultipleInputField {...defaultProps} options={field.valueOptions} />;

    case FORM_TYPE.CHECKBOX:
      return <CheckboxListField {...defaultProps} options={field.valueOptions} isOthers={true} />;

    case FORM_TYPE.NUMBER:
      return <NumberInputField {...defaultProps} />;

    case FORM_TYPE.NUMBER_RANGE:
      return <NumberRangeField {...defaultProps} />;

    case FORM_TYPE.DATE:
      return <DatePickerField {...defaultProps} />;

    case FORM_TYPE.YEAR:
      return <YearPickerField {...defaultProps} />;

    case FORM_TYPE.DATE_RANGE:
      return <DateRangePickerField {...defaultProps} />;

    case FORM_TYPE.FILE:
      return <FileField {...defaultProps} />;

    case FORM_TYPE.GEOMETRY:
      return <GeometryField {...defaultProps} />;

    default:
      return (
        <Box background="yellow" mb={4}>
          {field.type}: {field.fieldId}
        </Box>
      );
  }
}
