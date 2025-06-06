import { IconButton } from "@chakra-ui/react";
import { TextBoxField } from "@components/form/text";
import useUserListFilter from "@components/pages/user/common/use-user-filter";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import * as Yup from "yup";

const TextFilterForm = styled.form`
  display: flex;
  > div {
    flex-grow: 1;
  }
  > button {
    flex-shrink: 0;
    margin-left: 0.75rem;
  }
`;

export default function TextFilterInput({ filterKey, label, mb = 0 }) {
  const { filter, addFilter, removeFilter } = useUserListFilter();
  const defaultValue = filter?.[filterKey];

  const hForm = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        query: Yup.string(),
      })
    ),
    defaultValues: { query: defaultValue },
  });

  const handleOnChange = (v) => {
    v.query ? addFilter(filterKey, v.query) : removeFilter(filterKey);
  };

  return (
    <FormProvider {...hForm}>
      <TextFilterForm onSubmit={hForm.handleSubmit(handleOnChange)}>
        <TextBoxField name="query"  label={label} mb={mb} />
        <IconButton variant="solid" colorPalette="blue" type="submit" aria-label={`Find ${label}`}>
          <LuSearch />
        </IconButton>
      </TextFilterForm>
    </FormProvider>
  );
}
