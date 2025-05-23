import { CheckboxGroup, Stack } from "@chakra-ui/react";
import { addOrRemoveArray } from "@utils/basic";
import { filterLabelShow, transformGroupedOption } from "@utils/field";
import React, { useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import useResponseList from "../../use-response-list";
import FilterStat from "../stat";

const GroupedCheckboxes = ({ option, value, setValue, onChange, fieldId }) => {
  const allValues = option.children.map((o) => o.value);
  const allValuesIncl = [option.value, ...allValues];

  const allChecked = allValues.every((v) => value.includes(v));
  const isIndeterminate = allValues.some((v) => value.includes(v)) && !allChecked;

  const handleParentToggle = (e) => {
    const cleanValue = value.filter((v) => !allValuesIncl.includes(v));

    setValue(e.target.checked ? [...cleanValue, ...allValuesIncl] : cleanValue);
  };

  return (
    <>
      <Checkbox
        key={option.value}
        _hover={{ bg: "gray.100" }}
        checked={isIndeterminate ? "indeterminate" : allChecked}
        colorPalette={"blue"}
        onChange={handleParentToggle}
      >
        {option.label} <FilterStat fieldId={fieldId} value={allValuesIncl} />
      </Checkbox>
      <Stack pl={6} mt={1} gap={2}>
        {option.children.map((o) => (
          <Checkbox
            key={o.value}
            value={o.value}
            _hover={{ bg: "gray.100" }}
            onChange={onChange}
            colorPalette={"blue"}
          >
            {filterLabelShow(o)}
            <FilterStat fieldId={fieldId} value={o.value} />
          </Checkbox>
        ))}
      </Stack>
    </>
  );
};

export function OptionsFilter({ filterField }) {
  const { filter, addFilter } = useResponseList();

  const [defaultValue, options] = useMemo(() => {
    const v = filter.f[filterField.fieldId] || [];
    const _defaultValue = Array.isArray(v) ? v : [v];

    const _options: any = transformGroupedOption(filterField.valueOptions);

    return [_defaultValue, _options];
  }, [filterField]);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    addFilter(filterField.fieldId, value);
  }, [value]);

  const handleOnChange = (e) => setValue(addOrRemoveArray(value, e.target.value));

  return (
    <div>
      <CheckboxGroup value={value}>
        <Stack lineHeight={1.2}>
          {options.map((o) =>
            o.children.length > 0 ? (
              <GroupedCheckboxes
                key={o.value}
                option={o}
                value={value}
                setValue={setValue}
                onChange={handleOnChange}
                fieldId={filterField.fieldId}
              />
            ) : (
              <Checkbox
                key={o.value}
                checked={value.includes(o.value)}
                value={o.value}
                _hover={{ bg: "gray.100" }}
                onChange={handleOnChange}
                colorPalette={"blue"}
              >
                {filterLabelShow(o)}
                <FilterStat fieldId={filterField.fieldId} value={o.value} />
              </Checkbox>
            )
          )}
        </Stack>
      </CheckboxGroup>
    </div>
  );
}
