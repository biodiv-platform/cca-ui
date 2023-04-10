import "react-sortable-tree/style.css";
import { IconButton,Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import DeleteIcon from "@icons/delete";
import EditIcon from "@icons/edit";
import React from "react";
import SortableTree from "react-sortable-tree";
import useTemplate from "./use-template";
import TitleIcon from "@icons/title";
import FilterIcon from "@icons/filter";
import CalendarIcon from "@icons/calendar";
import SummaryIcon from "@icons/summary";
import TextIcon from "@icons/text";
import HeadingIcon from "@icons/heading";
import RadiobuttonIcon from "@icons/radiobutton";
import LocatinIcon from "@icons/location";
import FileIcon from "@icons/file";
import MultiselectIcon from "@icons/multiselect";
import NumberIcon from "@icons/number";
import RequiredIcon from "@icons/required";





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

   
      const generateNodeProps = (row) => ({
    
        title: row.node.name,
        buttons: [
                
       (row.node.type=="TEXT"||row.node.type=="TEXTAREA"||row.node.type=="RICHTEXT")&&<Tooltip label='Text'><IconButton
          colorScheme="black"
          minW="auto"
          aria-label="Text Field"
          variant="link"
          icon={<TextIcon />}

        /></Tooltip>,
    
        row.node.type=="HEADING"&&<Tooltip label='Heading'><IconButton
        colorScheme="black"
        minW="auto"
        aria-label="Heading Field"
        variant="link"
        icon={<HeadingIcon />}
        size='lg'
      /></Tooltip>,
      
    
      (row.node.type=="SINGLE_SELECT_RADIO"||row.node.type=="SINGLE_SELECT_DROPDOWN")&&<Tooltip label="Single-select"><IconButton
      minW="auto"
      aria-label="Single Select Field"
      variant="link"
      icon={<RadiobuttonIcon />}
      size='lg'
    /></Tooltip>,

   
    
    row.node.type=="MULTI_SELECT_CHECKBOX"&&<Tooltip label="Multi-select"><IconButton
    colorScheme="black"
    size='xl'
    minW="auto"
    aria-label="Multiple select Field"
    variant="link"
    icon={<MultiselectIcon />}
    /></Tooltip>,
    
          row.node.type=="NUMBER"&&<Tooltip label='Number'><IconButton
          colorScheme="black"
          size='xl'
          minW="auto"
          aria-label="Number Field"
          variant="link"
          icon={<NumberIcon />}
        /></Tooltip>,
    
        (row.node.type=="DATE"||row.node.type=="YEAR")&&<Tooltip label='Date'>
            <IconButton
          colorScheme="black"
          minW="auto"
          aria-label="Date Field"
          variant="link"
          icon={<CalendarIcon/>}
        />
          </Tooltip>,
   

        row.node.type=="FILE"&& <Tooltip label='File'><IconButton
          colorScheme="black"
          minW="auto"
          aria-label="File Field"
          variant="link"
          icon={<FileIcon />}
        /></Tooltip>,
    
        
        row.node.type=="GEOMETRY"&&<Tooltip label='Geometry'><IconButton
          colorScheme="black"
          size='xl'
          minW="auto"
          aria-label="Geometry Field"
          variant="link"
          icon={<LocatinIcon />}
        /></Tooltip>,
          
    
    
         row.node.isSummaryField&&<Tooltip label='Summary'><IconButton
         colorScheme="black"size='xl'
         minW="auto"
         aria-label="Summary Field"
         variant="link"
         icon={<SummaryIcon />}
     /></Tooltip>,
    
      row.node.isTitleColumn&&<Tooltip label='Title'><IconButton
          colorScheme="black"
          minW="auto"
          aria-label="Title Field"
          variant="link"
          icon={< TitleIcon/>}
        /></Tooltip>,
    
        row.node.isFilterable&&<Tooltip label='Filterable'><IconButton
          colorScheme="black"
          size='xl'
          minW="auto"
          aria-label="Filterable Field"
          variant="link"
          icon={<FilterIcon />}
        /></Tooltip>,
       
       row.node.isRequired&&<Tooltip label='Required'><IconButton
          colorScheme="black"
          size='lg'
          minW="auto"
          aria-label="Required Field"
          variant="link"
          icon={<RequiredIcon/>}
        /></Tooltip>,
        ' ',' ',' ',' ','  ',' ',
        <Tooltip label='edit'>
        <IconButton
            colorScheme="green"
            minW="auto"
            aria-label="Edit Field"
            variant="link"
            onClick={() => setCurrentField(row.node)}
            icon={<EditIcon />}
          />
          </Tooltip>,
          
          <Tooltip label='delete'>
            <IconButton
            colorScheme="red"
            minW="auto"
            aria-label="Delete Field"
            variant="link"
            onClick={() => removeFieldById(row.node.fieldId)}
            icon={<DeleteIcon />}
          />
          </Tooltip>,
          
          
          
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